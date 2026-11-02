import * as React from "react"
import { assignMotionRef } from "./refs.js"
import {
 acquireFlowEnvironment,
 createFlowPresence,
 attachFlowGroup,
 isFlowQuiet,
 replaceFlow,
} from "./flow.js";
import { subscribeSettings } from "./settings.js"

export function useFlowGroup(externalRef, options) {
 const kind=options?.kind,itemSelector=options?.itemSelector,activeSelector=options?.activeSelector
 return React.useCallback((el)=>{
  const releaseRef=assignMotionRef(externalRef,el)
  if(!el)return
  const cleanup=attachFlowGroup(el,{kind,itemSelector,activeSelector})
  return ()=>{cleanup();releaseRef()}
 },[externalRef,kind,itemSelector,activeSelector]);
}
/** Initial content is quiet; an actual opening or later mount uses the shared surface animation. */
export function useFlowAppearance(open, externalRef, kind='grow') {
 const [host,setHost]=React.useState(null),previous=React.useRef(undefined)
 const openRef=React.useRef(open),owner=React.useRef(null)
 const ref=React.useCallback((el)=>{
  setHost(el);const releaseRef=assignMotionRef(externalRef,el)
  return ()=>{setHost(null);releaseRef()}
 },[externalRef])
 React.useLayoutEffect(()=>{openRef.current=open;owner.current?.set(open);if(!open)previous.current=false},[open])
 React.useLayoutEffect(()=>{
  if(!host)return
  const open=openRef.current,release=acquireFlowEnvironment(),was=previous.current;previous.current=open
  const slide=kind==='slide-inline'||kind==='slide-block'
  const presence=createFlowPresence(host,slide?kind:kind==='fade'?'fade':kind==='grow')
  owner.current=presence
  if(open&&(slide||was===false||(was===undefined&&performance.now()>1500)))presence.enter()
  else presence.set(open,false)
  if(open)replaceFlow(host)
  const state=new MutationObserver(()=>presence.set(host.getAttribute('data-state')!=='closed'))
  state.observe(host,{attributes:true,attributeFilter:['data-state']})
  const quiet=()=>{if(isFlowQuiet(host)||document.hidden){presence.quiet();replaceFlow(host)}}
  const localQuiet=slide?new MutationObserver(quiet):null
  if(localQuiet)for(let element=host;element;element=element.parentElement)localQuiet.observe(element,{attributes:true,attributeFilter:['data-flow','data-no-glide']})
  const rm=matchMedia('(prefers-reduced-motion: reduce)');rm.addEventListener('change',quiet)
  document.addEventListener('visibilitychange',quiet)
  const unsubscribe=subscribeSettings(quiet)
  return ()=>{if(owner.current===presence)owner.current=null;presence.dispose();state.disconnect();localQuiet?.disconnect();unsubscribe();rm.removeEventListener('change',quiet);document.removeEventListener('visibilitychange',quiet);release()}
 },[host,kind])
 return ref
}
