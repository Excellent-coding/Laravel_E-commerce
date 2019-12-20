/**
 * @module   αCounter
 * @version  0.1.2
 * @author   OXAYAZA {@link https://github.com/OXAYAZA}
 * @license  CC BY-SA 4.0 {@link https://creativecommons.org/licenses/by-sa/4.0/}
 * @requires module:αUtil
 * @see      {@link https://oxayaza.page.link/gitHub_aCounters}
 * @see      {@link https://codepen.io/OXAYAZA/pen/JJryqW}
 * @see      {@link https://oxayaza.page.link/linkedin}
 */
function aCounter(data){function Counter(data){if(!data||!data.node)throw Error('Missing required aCounter parameters (node).');this.params=Util.merge([this.defaults,data]);this.params.node.counter=this;if(!this.params.to){try{this.params.to=parseInt(this.params.node.textContent,10)}catch(error){throw Error('Unable to get aCounter value')}}this.run=this.run.bind(this);return this}Counter.prototype.internal={intervalId:null,value:0,loops:0,increment:0,loop:0};Counter.prototype.defaults={node:null,from:0,to:null,duration:3000,refresh:30,formatter:null,onStart:null,onUpdate:null,onComplete:null};Counter.prototype.run=function(){clearInterval(this.internal.intervalId);this.internal.value=this.params.from;this.internal.loops=Math.ceil(this.params.duration/this.params.refresh);this.internal.increment=(this.params.to-this.params.from)/this.internal.loops;this.internal.loop=0;var event=new CustomEvent('counterStart');event.value=~~this.internal.value;if(this.params.node.dispatchEvent(event)&&this.params.onStart instanceof Function){this.params.onStart.call(this,~~this.internal.value)}this.internal.intervalId=setInterval(this.update.bind(this),this.params.refresh)};Counter.prototype.update=function(){this.internal.value+=this.internal.increment;this.internal.loop++;var event=new CustomEvent('counterUpdate');event.value=~~this.internal.value;if(this.params.node.dispatchEvent(event)&&this.params.onUpdate instanceof Function){this.params.onUpdate.call(this,~~this.internal.value)}if(this.internal.loop>=this.internal.loops){clearInterval(this.internal.intervalId);this.internal.value=this.params.to;var event=new CustomEvent('counterComplete');event.value=~~this.internal.value;if(this.params.node.dispatchEvent(event)&&this.params.onComplete instanceof Function){this.params.onComplete.call(this,~~this.internal.value)}}this.render()};Counter.prototype.render=function(){if(this.params.formatter instanceof Function){this.params.node.innerHTML=this.params.formatter.call(this,~~this.internal.value)}else{this.params.node.innerHTML=~~this.internal.value}};return new Counter(data)}