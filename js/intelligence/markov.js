var Markov=function(str,chain_length){this.init(str,chain_length)};Markov.prototype=(function(){var NONWORD="NONWORD",state,input,markovChain,chainLength,init,makeChain,pushChain,each,pick,initState,nextState,getChain;init=function(str,len){len=Number(len);chainLength=len>0?len:1;input=str;makeChain(input)};makeChain=function(){initState();markovChain={};var strArr=input.split(''),i,c;for(i=0;i<strArr.length;i+=1){c=strArr[i];pushChain(c);nextState(c)}pushChain(NONWORD)};pushChain=function(c){var chain=markovChain,i;for(i=0;i<(chainLength-1);i+=1){if(typeof chain[state[i]]==='undefined'){chain[state[i]]={}}chain=chain[state[i]]}if(typeof chain[state[chainLength-1]]==='undefined'){chain[state[chainLength-1]]=[]}chain[state[chainLength-1]].push(c)};each=function(lambda){initState();for(;;){var p=pick();if(p===NONWORD){break}else{lambda.apply(null,[p])}nextState(p)}};pick=function(){var chain=markovChain,i,r;for(i=0;i<chainLength;i+=1){chain=chain[state[i]]}r=Math.floor(Math.random()*chain.length);return chain[r]};initState=function(){state=[];for(var i=0;i<chainLength;i+=1){state[i]=NONWORD}};nextState=function(c){for(var i=0;i<(chainLength-1);i+=1){state[i]=state[i+1]}state[chainLength-1]=c};getChain=function(){return markovChain};return{init:init,each:each,getChain:getChain}})();