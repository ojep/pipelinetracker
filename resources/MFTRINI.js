conc = function(linha){
    var l  = document.getElementById(linha);
    var r1 = Number.parseFloat(l.children[3].childNodes.item(0).value);
    var r2 = Number.parseFloat(l.children[4].childNodes.item(0).value);
    l.children[5].childNodes.item(0).value = (((r1+r2)/2)*40)/1000;
    if(r1/r2<=0.85||r2/r1<=0.85){
	l.children[5].classList.add('alerta');
    }else{
	l.children[5].classList.remove('alerta');
    }
};
molarity = function(linha){
    var l = document.getElementById(linha);
    var c = Number.parseFloat(l.children[5].childNodes.item(0).value);
    var m = ((c/191.4)*1000);
    l.children[6].childNodes.item(0).value = m;

    if(m<10||m>250){
	l.children[6].classList.add('alerta');
    }else{
	l.children[6].classList.remove('alerta');
    }
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
    console.log('Concentração calculada');
    molarity(linha);
    console.log('Molaridade calculada');
    pooling(linha);
    console.log('Pooling calculado');
}

makeSampleSheet = function (batch) {
    var textFile = null;
    var makeTextFile = function (text) {
	var data = new Blob([text], {type: 'text/plain'});

	if (textFile !== null) {
	    window.URL.revokeObjectURL(textFile);
	}

	textFile = window.URL.createObjectURL(data);

	return textFile;
    };
    var index = ['CGATGT','ACAGTG','CAGATC','CTTGTA','AGTCAA','AGTTCC','GTCCGC','GTGAAA','ATCACG','TTAGGC','ACTTGA','TAGCTT','GTGGCC','CGTACG','ACTGAT'];
    var text = null;
    text  = '[Header]\nIEMFileVersion,4';
    text += '\nInvestigator Name,' + document.getElementById('operator').value;
    text += '\nExperiment Name,' + document.getElementById('experiment').value;
    text += '\nDate,' + document.getElementById('dataexame').value;
    text += '\nWorkflow,GenerateFASTQ\nApplication,FASTQ Only\nAssay,TruSeq LT\nDescription,cfDNANextSeqv1.0\nChemistry,Default\n\n[Reads]\n36\n\n[Settings]\nReverseComplement,0\n\n[Data]\nSample_ID,Sample_Name,Sample_Plate,Sample_Well,I7_Index_ID,index,Sample_Project,Description,SampleType,Library_nM\n';

    for(var i=1;i<=15;i++){
     	var l = document.getElementById(batch+'l'+i);
     	var tds = new Array();
	l.childNodes.forEach(function(item){
     	    if(item.nodeType==1){
     		tds.push(item.childNodes.item(0).value);
     	    }
    	});
     	if(tds[0]=='') continue;
     	text += tds[0]+','+tds[0]+',,'+tds[1] +',A'+('000'+tds[2]).slice(-3)+','+index[i-1]+',,,Test,'+tds[6]+'\n';
    }
    var link = document.getElementById('downloadBatch1');
    link.href = makeTextFile(text);
    link.style.display = 'block';
    link.download = 'SampleSheet_'+document.getElementById('experiment').value+'.csv';
/*  create.addEventListener('click', function () {
	var link = document.getElementById('downloadlink');
	link.href = makeTextFile(textbox.value);
	link.style.display = 'block';
    }, false);*/
}

