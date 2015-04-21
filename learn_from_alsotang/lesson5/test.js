var urls = [];
for(var i=0; i<30;i++){
	urls.push("http://localhost:100000/"+ i + ".html");
}

if(urls.map){
	        urls = urls.map(function (x, i) {
            return {index: i, value: x};
        });
}

console.log(urls);