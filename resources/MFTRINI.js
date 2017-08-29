//Nome:   MFTRINI.js
//Versão: 0.2
//0.1 - primeira versão funcional
//0.2 - desenhando as tabelas de formulário

conc = function(linha){
	var r1 = Number.parseFloat(document.getElementById('qr1_'+linha).value);
	var r2 = Number.parseFloat(document.getElementById('qr2_'+linha).value);
	var conc=document.getElementById('conc_'+linha);
	conc.raw = (((r1+r2)/2)*40)/1000;
	conc.value = Number.parseFloat(conc.raw).toFixed(2);
	if(r1/r2<=0.85||r2/r1<=0.85){
		conc.classList.add('alerta');
	}else{
		conc.classList.remove('alerta');
	}
};
molarity = function(linha){
	var m = document.getElementById('molarity_'+linha);
	m.raw = ((Number.parseFloat(document.getElementById('conc_'+linha).value)/191.4)*1000);
	m.value = Number.parseFloat(m.raw).toFixed(1);

	if(m.value < 10||m.value >250){
		m.classList.add('alerta');
	}else{
		m.classList.remove('alerta');
	}
};
pooling = function(linha){
	var m = document.getElementById('molarity_'+linha);
	var p = document.getElementById('pooling_'+linha);
	if(Number.parseFloat(m.value)>=10){
		p.value = Number.parseFloat(m.value)-10;
		p.classList.remove('alerta');
	}else{
		p.classList.add('alerta');
	}
};

draw = function(fieldset){
	var fs = document.getElementById(fieldset);
	var table = document.createElement('table');
	fs.appendChild(table);
	for(var i=1; i <=18; i++){
		var tr = table.insertRow();
		var row_id = fieldset+'r'+i;
		tr.id = row_id;
		var headers = ['Sample ID', 'Well', 'Index', 'Qubit Reading 1', 'Qubit Reading 2', 'ng/'+String.fromCharCode(956)+'L', 'Qubit nM', 'EB to Plate', 'Control'];
		var wells   = ['A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2', 'A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4', 'H4'];
		var index   = ['2', '5', '7', '12', '13', '14', '18', '19', '1', '3', '8', '10', '20', '22', '25', '27'];
		if(i==1){
			for(j=0; j<=8;j++){
				var th = tr.appendChild(document.createElement('th'));
				th.innerText = headers[j];
			}
		}else if(i==18){
			var td = tr.insertCell();
			td.rowspan=9;
			td.innerText='Pool final';
		}else{
			td = tr.insertCell();
			var inp = td.appendChild(document.createElement('input'));
			inp.id = 'sample_id_'+i;
			inp.className= 'sample';
			inp.type='text';
			td = tr.insertCell();
			inp=td.appendChild(document.createElement('input'));
			inp.id = 'well_'+i;
			inp.type = 'text';
			inp.className= 'well';
			inp.size = 2;
			inp.value = wells[i-2];
			inp.disabled = true;
			td = tr.insertCell();
			inp=td.appendChild(document.createElement('input'));
			inp.type = 'text';
			inp.size= 2;
			inp.disabled = true;
			inp.className = 'index'
			inp.value = index[i-2];
			td = tr.insertCell();
			inp=td.appendChild(document.createElement('input'));
			inp.id   = 'qr1_'+i;
			inp.type = 'text';
			inp.size = 4;
			inp.className = 'qr1';
			td = tr.insertCell();
			inp=td.appendChild(document.createElement('input'));
			inp.id   = 'qr2_'+i;
			inp.type = 'text';
			inp.size = 4;
			inp.className = 'qr2';
			inp.linha = i;
			inp.addEventListener('blur', function() {
				action(this.linha);
			}, false);
			td = tr.insertCell();
			inp=td.appendChild(document.createElement('input'));
			inp.id = 'conc_'+i;
			inp.type = 'text';
			inp.disabled = true;
			inp.size = 2;
			td = tr.insertCell();
			inp=td.appendChild(document.createElement('input'));
			inp.id = 'molarity_'+i;
			inp.type = 'text';
			inp.disabled = true;
			inp.size = 2;
			td = tr.insertCell();
			inp=td.appendChild(document.createElement('input'));
			inp.id = 'pooling_'+i;
			inp.type = 'text';
			inp.disabled = true;
			inp.size = 2;			
			td = tr.insertCell();
			inp=td.appendChild(document.createElement('input'));
			inp.type = 'radio';
			inp.name = 'control';
			inp.id= 'control_'+i;
			inp.className='positive';
			inp.required=true;
		}	
	}  
	/*
	 * var gera1 = document.getElementById('btGera1'); var gera2 =
	 * document.getElementById('btGera2'); gera1.addEventListener('click',
	 * makeSampleSheet('b1'), false); gera2.addEventListener('click',
	 * makeSampleSheet('b2'), false);
	 */
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
		text += tds[0]+','+tds[0]+',,'+tds[1] +',A'+('000'+tds[2]).slice(-3)+','+index[i-1];
		if(i==14){
			teste +=',,,Test,';
		}else{
			teste +=',,,Control,';
		}
		teste += tds[6]+'\n';
	}
	var link = document.getElementById('downloadBatch1');
	link.href = makeTextFile(text);
	link.style.display = 'block';
	link.download = 'SampleSheet_'+document.getElementById('experiment').value+'.csv';
	/*
	 * create.addEventListener('click', function () { var link =
	 * document.getElementById('downloadlink'); link.href =
	 * makeTextFile(textbox.value); link.style.display = 'block'; }, false);
	 */
}

init = function(){
	var today = new Date();
	document.getElementById('dataexame').value = today.toLocaleDateString();
	draw('fs1');
//	draw('fs2');
};

action = function(linha){
	conc(linha);
	console.log('Concentração calculada');
	molarity(linha);
	console.log('Molaridade calculada');
	pooling(linha);
	console.log('Pooling calculado');
}