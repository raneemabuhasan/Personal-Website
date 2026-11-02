/** Retain caller identities exactly once while reconciling additions/removals. */
export function reconcileSwapOrder(order,ids){return [...new Set([...order.filter(id=>ids.includes(id)),...ids])];}
export function swapLayoutItems(order,first,second){
 const next=[...order],a=next.indexOf(first),b=next.indexOf(second);if(a<0||b<0||a===b)return next;[next[a],next[b]]=[next[b],next[a]];return next;
}
export function shouldDismissDrawer(offset,width,side){
 return Number.isFinite(offset)&&Number.isFinite(width)&&width>0&&(side==="left"?-offset:offset)>Math.max(48,width*.28);
}
export function supportDestination(href) {
 const value=href.trim();if(!value||/[\u0000-\u001f]/.test(value))return;
 if(value.startsWith("/")&&!value.startsWith("//"))return value;
 if(value.startsWith("#")&&value.length>1)return value;
 try{const url=new URL(value);if(url.protocol==="https:"||url.protocol==="http:"||url.protocol==="mailto:")return value;}catch{/* No destination is rendered for malformed URLs. */}
}
