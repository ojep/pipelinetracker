conc = function(linha){
    var l  = document.getElementById(linha);
    var r1 = Number.parseFloat(l.children[3].childNodes.item(0).value);
    var r2 = Number.parseFloat(l.children[4].childNodes.item(0).value);
    l.children[5].childNodes.item(0).value = (((r1+r2)/2)*40)/1000;
    if(r1/r2<=0.9||r2/r1<=0.9){
	l.children[5].classList.add('alerta');
    }else{
	l.children[5].classList.remove('alerta');
    }
};
molarity = function(linha){
    var l = document.getElementById(linha);
    var c = Number.parseFloat(l.children[5].childNodes.item(0).value);
    l.children[6].childNodes.item(0).value = ((c/191.4)*1000).toFixed(1);
};
pooling = function(linha){
    l = document.getElementById(linha);
    if(Number.parseFloat(l.children[6].childNodes.item(0).value)>=10){
	l.children[7].childNodes.item(0).value = Number.parseFloat(l.children[6].childNodes.item(0).value)-10;
	l.children[7].childNodes.item(0).classList.remove('alerta');
    }else{
	l.children[7].childNodes.item(0).classList.add('alerta');
    }
};
init = function(){
    var today = new Date();
    document.getElementById('dataexame').value = today.toLocaleDateString();
};
action = function(linha){
    conc(linha);
    console.log('ConcentraÃ§Ã£o calculada');
    molarity(linha);
    console.log('Molaridade calculada');
    pooling(linha);
    console.log('Pooling calculado');
}

