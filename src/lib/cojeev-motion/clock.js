let time=null;
const pending=new Set()
const drivers=new Set()
const animationStarts=new Map()
const now=()=>time??performance.now()
function arm(timer){timer.native=setTimeout(()=>{timer.native=null;if(timer.cancelled)return;pending.delete(timer);timer.run()},Math.max(0,timer.at-performance.now()))}
export function scheduleMotion(run, delay) {
 const timer={at:now()+Math.max(0,delay),run,native:null,cancelled:false};pending.add(timer)
 if(time===null)arm(timer)
 return timer
}
export function cancelMotion(timer){if(!timer)return;timer.cancelled=true;if(timer.native!==null)clearTimeout(timer.native);timer.native=null;pending.delete(timer)}
export function registerMotionClock(driver){drivers.add(driver);return ()=>{drivers.delete(driver)}}
export function getMotionTime(){return now()}
export function isMotionClockFrozen(){return time!==null}
/** Freeze before an interaction. First spring delta is zero; timer callbacks can enqueue subsequent beats. */
export function motionClock(next){
 if(next===null){
  const was=time;time=null
  if(was!==null)for(const timer of pending){timer.at=performance.now()+Math.max(0,timer.at-was);arm(timer)}
  drivers.forEach(driver=>driver(null))
  for(const [animation,state] of animationStarts){if(state.wasRunning)animation.play()}
  animationStarts.clear();return
 }
 if(!Number.isFinite(next))throw new Error("Motion clock expects finite milliseconds or null.")
 if(time===null){const real=performance.now();for(const timer of pending){if(timer.native!==null)clearTimeout(timer.native);timer.native=null;timer.at=next+Math.max(0,timer.at-real)}}
 time=next
 drivers.forEach(driver=>driver(next))
 // Due callbacks observe this clock sample, matching the source phase queue.
 let due
 while((due=[...pending].filter(timer=>timer.at<=next).sort((a,b)=>a.at-b.at)[0])){
  pending.delete(due);if(due.cancelled)continue;due.run()
 }
 time=next
 if(typeof document!=="undefined"){
  const animations=document.getAnimations()
  for(const animation of animations){
   if(!animationStarts.has(animation)){animationStarts.set(animation,{at:next,wasRunning:animation.playState==="running"});animation.pause()}
   animation.currentTime=Math.max(0,next-animationStarts.get(animation).at)
  }
  for(const animation of animationStarts.keys())if(!animations.includes(animation))animationStarts.delete(animation)
 }
}
export const flowClock=motionClock
