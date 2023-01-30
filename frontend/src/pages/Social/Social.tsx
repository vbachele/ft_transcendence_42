import {useState} from 'react';
import {IUser} from 'types/models';
import {Divider, Input} from 'antd';
import Friend from './components/Friend';
import * as S from './Social.styles';
import * as F from 'styles/font.styles';
import compareStatus from 'helpers/compareStatus';
import Blocked from './components/Blocked';

// prettier-ignore
const friends: IUser[] = [
	{"id":23,"name":"Minnis","image":"https://robohash.org/quiquaeratcorrupti.png?size=200x200&set=set1","coalition":"Assembly","status":"ingame","games":16,"wins":6,"ratio":0.38,"achievements":["Achievement 1","Achievement 2"],"score":552},
	{"id":24,"name":"Dalston","image":"https://robohash.org/estvoluptasest.png?size=200x200&set=set1","coalition":"Assembly","status":"online","games":33,"wins":0,"ratio":0.0,"achievements":["Achievement 1","Achievement 2"],"score":330},
	{"id":25,"name":"Toppin","image":"https://robohash.org/explicaboundesint.png?size=200x200&set=set1","coalition":"Order","status":"offline","games":43,"wins":41,"ratio":0.95,"achievements":["Achievement 1","Achievement 2"],"score":4036},
	{"id":26,"name":"Coleman","image":"https://robohash.org/doloresbeataeculpa.png?size=200x200&set=set1","coalition":"Assembly","status":"ingame","games":30,"wins":1,"ratio":0.03,"achievements":["Achievement 1","Achievement 2"],"score":350},
	{"id":27,"name":"Helder","image":"https://robohash.org/sitveropossimus.png?size=200x200&set=set1","coalition":"Federation","status":"ingame","games":69,"wins":59,"ratio":0.86,"achievements":["Achievement 1","Achievement 2"],"score":5673},
	{"id":28,"name":"Kingcott","image":"https://robohash.org/magnisitvoluptatibus.png?size=200x200&set=set1","coalition":"Order","status":"online","games":23,"wins":23,"ratio":1.0,"achievements":["Achievement 1","Achievement 2"],"score":2300},
	{"id":29,"name":"Tripett","image":"https://robohash.org/expeditaaperiamet.png?size=200x200&set=set1","coalition":"Assembly","status":"offline","games":13,"wins":1,"ratio":0.08,"achievements":["Achievement 1","Achievement 2"],"score":183},
	{"id":30,"name":"Gummory","image":"https://robohash.org/eumeoset.png?size=200x200&set=set1","coalition":"Assembly","status":"ingame","games":3,"wins":3,"ratio":1.0,"achievements":["Achievement 1","Achievement 2"],"score":300},
	{"id":31,"name":"Doddemeade","image":"https://robohash.org/omnisundedoloribus.png?size=200x200&set=set1","coalition":"Alliance","status":"offline","games":71,"wins":28,"ratio":0.39,"achievements":["Achievement 1","Achievement 2"],"score":2543},
	{"id":32,"name":"Esser","image":"https://robohash.org/suntfugitet.png?size=200x200&set=set1","coalition":"Assembly","status":"offline","games":31,"wins":22,"ratio":0.71,"achievements":["Achievement 1","Achievement 2"],"score":2034},
	{"id":33,"name":"Laval","image":"https://robohash.org/repellendusnemout.png?size=200x200&set=set1","coalition":"Alliance","status":"online","games":65,"wins":25,"ratio":0.39,"achievements":["Achievement 1","Achievement 2"],"score":2293},
	{"id":34,"name":"Ambroziak","image":"https://robohash.org/occaecatioptionam.png?size=200x200&set=set1","coalition":"Federation","status":"offline","games":62,"wins":52,"ratio":0.84,"achievements":["Achievement 1","Achievement 2"],"score":4968},
	{"id":35,"name":"Snoddin","image":"https://robohash.org/quamplaceatmollitia.png?size=200x200&set=set1","coalition":"Alliance","status":"online","games":75,"wins":46,"ratio":0.61,"achievements":["Achievement 1","Achievement 2"],"score":4169},
	{"id":36,"name":"Barson","image":"https://robohash.org/nihildebitispossimus.png?size=200x200&set=set1","coalition":"Order","status":"offline","games":92,"wins":83,"ratio":0.9,"achievements":["Achievement 1","Achievement 2"],"score":8056},
	{"id":37,"name":"Campbell-Dunlop","image":"https://robohash.org/rationevelitipsam.png?size=200x200&set=set1","coalition":"Alliance","status":"online","games":17,"wins":3,"ratio":0.18,"achievements":["Achievement 1","Achievement 2"],"score":342},
	{"id":38,"name":"Wimbush","image":"https://robohash.org/recusandaeutvoluptas.png?size=200x200&set=set1","coalition":"Alliance","status":"online","games":49,"wins":36,"ratio":0.74,"achievements":["Achievement 1","Achievement 2"],"score":3358},
	{"id":39,"name":"Royse","image":"https://robohash.org/delectusaliquidut.png?size=200x200&set=set1","coalition":"Order","status":"ingame","games":57,"wins":8,"ratio":0.14,"achievements":["Achievement 1","Achievement 2"],"score":1014},
	{"id":40,"name":"Gilks","image":"https://robohash.org/impeditdebitisiusto.png?size=200x200&set=set1","coalition":"Order","status":"offline","games":49,"wins":32,"ratio":0.65,"achievements":["Achievement 1","Achievement 2"],"score":2920},
	{"id":41,"name":"Radwell","image":"https://robohash.org/enimnumquamaut.png?size=200x200&set=set1","coalition":"Alliance","status":"online","games":39,"wins":32,"ratio":0.82,"achievements":["Achievement 1","Achievement 2"],"score":3039},
	{"id":42,"name":"Cattrall","image":"https://robohash.org/iddolorillum.png?size=200x200&set=set1","coalition":"Order","status":"ingame","games":64,"wins":60,"ratio":0.94,"achievements":["Achievement 1","Achievement 2"],"score":5897},
	{"id":43,"name":"Shere","image":"https://robohash.org/consequaturaspernatureum.png?size=200x200&set=set1","coalition":"Federation","status":"ingame","games":4,"wins":4,"ratio":1.0,"achievements":["Achievement 1","Achievement 2"],"score":400},
	{"id":44,"name":"Kubis","image":"https://robohash.org/quonondeleniti.png?size=200x200&set=set1","coalition":"Order","status":"offline","games":79,"wins":37,"ratio":0.47,"achievements":["Achievement 1","Achievement 2"],"score":3336},
	{"id":45,"name":"Crowley","image":"https://robohash.org/aliquamsitlaboriosam.png?size=200x200&set=set1","coalition":"Federation","status":"ingame","games":66,"wins":28,"ratio":0.42,"achievements":["Achievement 1","Achievement 2"],"score":2527},
	{"id":46,"name":"Gready","image":"https://robohash.org/atquisquamsit.png?size=200x200&set=set1","coalition":"Alliance","status":"online","games":99,"wins":83,"ratio":0.84,"achievements":["Achievement 1","Achievement 2"],"score":7930},
	{"id":47,"name":"Mityushin","image":"https://robohash.org/quiadeserunterror.png?size=200x200&set=set1","coalition":"Alliance","status":"offline","games":12,"wins":4,"ratio":0.33,"achievements":["Achievement 1","Achievement 2"],"score":372},
	{"id":48,"name":"Fincher","image":"https://robohash.org/auterroradipisci.png?size=200x200&set=set1","coalition":"Alliance","status":"ingame","games":10,"wins":6,"ratio":0.6,"achievements":["Achievement 1","Achievement 2"],"score":544},
	{"id":49,"name":"Liepina","image":"https://robohash.org/officiisanimisint.png?size=200x200&set=set1","coalition":"Federation","status":"offline","games":55,"wins":21,"ratio":0.38,"achievements":["Achievement 1","Achievement 2"],"score":1918},
	{"id":50,"name":"Melato","image":"https://robohash.org/quidemlaborumconsequuntur.png?size=200x200&set=set1","coalition":"Alliance","status":"ingame","games":50,"wins":48,"ratio":0.96,"achievements":["Achievement 1","Achievement 2"],"score":4743},
	{"id":51,"name":"Lemoir","image":"https://robohash.org/voluptatemdoloremat.png?size=200x200&set=set1","coalition":"Assembly","status":"ingame","games":14,"wins":2,"ratio":0.14,"achievements":["Achievement 1","Achievement 2"],"score":250},
	{"id":52,"name":"Bess","image":"https://robohash.org/providentquaeratet.png?size=200x200&set=set1","coalition":"Assembly","status":"offline","games":57,"wins":45,"ratio":0.79,"achievements":["Achievement 1","Achievement 2"],"score":4242},
	{"id":53,"name":"Thowes","image":"https://robohash.org/veniamestoccaecati.png?size=200x200&set=set1","coalition":"Order","status":"offline","games":96,"wins":3,"ratio":0.03,"achievements":["Achievement 1","Achievement 2"],"score":1112},
	{"id":54,"name":"Werrett","image":"https://robohash.org/suntharumiste.png?size=200x200&set=set1","coalition":"Assembly","status":"online","games":4,"wins":0,"ratio":0.0,"achievements":["Achievement 1","Achievement 2"],"score":40},
	{"id":55,"name":"Jandl","image":"https://robohash.org/animietfugit.png?size=200x200&set=set1","coalition":"Assembly","status":"offline","games":31,"wins":4,"ratio":0.13,"achievements":["Achievement 1","Achievement 2"],"score":531},
	{"id":56,"name":"Crain","image":"https://robohash.org/situtvoluptates.png?size=200x200&set=set1","coalition":"Alliance","status":"online","games":78,"wins":28,"ratio":0.36,"achievements":["Achievement 1","Achievement 2"],"score":2584},
	{"id":57,"name":"Swindells","image":"https://robohash.org/blanditiisquivoluptates.png?size=200x200&set=set1","coalition":"Federation","status":"ingame","games":44,"wins":22,"ratio":0.5,"achievements":["Achievement 1","Achievement 2"],"score":1980},
	{"id":58,"name":"Pandey","image":"https://robohash.org/sedlaborumrepellat.png?size=200x200&set=set1","coalition":"Federation","status":"ingame","games":96,"wins":8,"ratio":0.08,"achievements":["Achievement 1","Achievement 2"],"score":1382},
	{"id":59,"name":"Owtram","image":"https://robohash.org/doloremillummaiores.png?size=200x200&set=set1","coalition":"Federation","status":"ingame","games":2,"wins":0,"ratio":0.0,"achievements":["Achievement 1","Achievement 2"],"score":20},
	{"id":60,"name":"Blencowe","image":"https://robohash.org/perspiciatisettempore.png?size=200x200&set=set1","coalition":"Federation","status":"online","games":82,"wins":72,"ratio":0.88,"achievements":["Achievement 1","Achievement 2"],"score":6956},
	{"id":61,"name":"Loader","image":"https://robohash.org/nonetducimus.png?size=200x200&set=set1","coalition":"Federation","status":"online","games":51,"wins":10,"ratio":0.2,"achievements":["Achievement 1","Achievement 2"],"score":1092},
	{"id":62,"name":"Rosetti","image":"https://robohash.org/nihilquoest.png?size=200x200&set=set1","coalition":"Federation","status":"ingame","games":63,"wins":6,"ratio":0.1,"achievements":["Achievement 1","Achievement 2"],"score":957},
	{"id":63,"name":"Gairdner","image":"https://robohash.org/modiimpeditfuga.png?size=200x200&set=set1","coalition":"Assembly","status":"offline","games":55,"wins":23,"ratio":0.42,"achievements":["Achievement 1","Achievement 2"],"score":2087},
	{"id":64,"name":"Brotherton","image":"https://robohash.org/atquisut.png?size=200x200&set=set1","coalition":"Assembly","status":"ingame","games":40,"wins":40,"ratio":1.0,"achievements":["Achievement 1","Achievement 2"],"score":4000},
	{"id":65,"name":"De Benedetti","image":"https://robohash.org/ducimusmodifacilis.png?size=200x200&set=set1","coalition":"Order","status":"ingame","games":37,"wins":5,"ratio":0.14,"achievements":["Achievement 1","Achievement 2"],"score":649},
	{"id":66,"name":"Nickless","image":"https://robohash.org/similiquefacilisrem.png?size=200x200&set=set1","coalition":"Order","status":"online","games":66,"wins":4,"ratio":0.06,"achievements":["Achievement 1","Achievement 2"],"score":869},
	{"id":67,"name":"Shelmerdine","image":"https://robohash.org/sitametaccusantium.png?size=200x200&set=set1","coalition":"Federation","status":"offline","games":31,"wins":0,"ratio":0.0,"achievements":["Achievement 1","Achievement 2"],"score":310},
	{"id":68,"name":"Stickland","image":"https://robohash.org/quasiporrotemporibus.png?size=200x200&set=set1","coalition":"Assembly","status":"offline","games":86,"wins":0,"ratio":0.0,"achievements":["Achievement 1","Achievement 2"],"score":860},
	{"id":69,"name":"Normanville","image":"https://robohash.org/eumdignissimosconsequatur.png?size=200x200&set=set1","coalition":"Assembly","status":"online","games":84,"wins":23,"ratio":0.27,"achievements":["Achievement 1","Achievement 2"],"score":2235},
	{"id":70,"name":"Patria","image":"https://robohash.org/seddoloreplaceat.png?size=200x200&set=set1","coalition":"Assembly","status":"online","games":48,"wins":46,"ratio":0.96,"achievements":["Achievement 1","Achievement 2"],"score":4547},
	{"id":71,"name":"Pantone","image":"https://robohash.org/vitaehicconsectetur.png?size=200x200&set=set1","coalition":"Federation","status":"ingame","games":5,"wins":2,"ratio":0.4,"achievements":["Achievement 1","Achievement 2"],"score":182},
	{"id":72,"name":"Berrie","image":"https://robohash.org/culpaminimafacilis.png?size=200x200&set=set1","coalition":"Alliance","status":"ingame","games":42,"wins":7,"ratio":0.17,"achievements":["Achievement 1","Achievement 2"],"score":819},
	{"id":73,"name":"Deaville","image":"https://robohash.org/perspiciatiseosamet.png?size=200x200&set=set1","coalition":"Assembly","status":"online","games":77,"wins":61,"ratio":0.79,"achievements":["Achievement 1","Achievement 2"],"score":5745},
	{"id":74,"name":"Pierse","image":"https://robohash.org/eiusquinesciunt.png?size=200x200&set=set1","coalition":"Federation","status":"ingame","games":9,"wins":6,"ratio":0.67,"achievements":["Achievement 1","Achievement 2"],"score":551},
	{"id":75,"name":"Vallantine","image":"https://robohash.org/excepturidoloremquia.png?size=200x200&set=set1","coalition":"Federation","status":"ingame","games":92,"wins":57,"ratio":0.62,"achievements":["Achievement 1","Achievement 2"],"score":5184},
	{"id":76,"name":"Shiliton","image":"https://robohash.org/minimaetblanditiis.png?size=200x200&set=set1","coalition":"Alliance","status":"online","games":3,"wins":3,"ratio":1.0,"achievements":["Achievement 1","Achievement 2"],"score":300},
	{"id":77,"name":"Mellody","image":"https://robohash.org/aliquidmagniiure.png?size=200x200&set=set1","coalition":"Federation","status":"offline","games":22,"wins":2,"ratio":0.09,"achievements":["Achievement 1","Achievement 2"],"score":327},
	{"id":78,"name":"Enever","image":"https://robohash.org/totamautsint.png?size=200x200&set=set1","coalition":"Alliance","status":"online","games":93,"wins":74,"ratio":0.8,"achievements":["Achievement 1","Achievement 2"],"score":7002},
	{"id":79,"name":"Bothbie","image":"https://robohash.org/autnonblanditiis.png?size=200x200&set=set1","coalition":"Federation","status":"ingame","games":82,"wins":53,"ratio":0.65,"achievements":["Achievement 1","Achievement 2"],"score":4851},
	{"id":80,"name":"Brahms","image":"https://robohash.org/eapariaturin.png?size=200x200&set=set1","coalition":"Alliance","status":"online","games":83,"wins":15,"ratio":0.18,"achievements":["Achievement 1","Achievement 2"],"score":1687},
	{"id":81,"name":"Ellam","image":"https://robohash.org/iustovoluptassint.png?size=200x200&set=set1","coalition":"Alliance","status":"ingame","games":73,"wins":16,"ratio":0.22,"achievements":["Achievement 1","Achievement 2"],"score":1671},
	{"id":82,"name":"Cartwight","image":"https://robohash.org/reiciendisminuspossimus.png?size=200x200&set=set1","coalition":"Federation","status":"ingame","games":54,"wins":8,"ratio":0.15,"achievements":["Achievement 1","Achievement 2"],"score":989},
	{"id":83,"name":"Banthorpe","image":"https://robohash.org/liberoexpeditaquis.png?size=200x200&set=set1","coalition":"Order","status":"ingame","games":2,"wins":0,"ratio":0.0,"achievements":["Achievement 1","Achievement 2"],"score":20},
	{"id":84,"name":"mmmmmmmm","image":"https://robohash.org/officiadolorarchitecto.png?size=200x200&set=set1","coalition":"Federation","status":"ingame","games":49,"wins":9,"ratio":0.18,"achievements":["Achievement 1","Achievement 2"],"score":1003},
	{"id":85,"name":"Corah","image":"https://robohash.org/quidemarchitectoex.png?size=200x200&set=set1","coalition":"Federation","status":"ingame","games":24,"wins":15,"ratio":0.63,"achievements":["Achievement 1","Achievement 2"],"score":1369},
	{"id":86,"name":"Galer","image":"https://robohash.org/undeevenietdistinctio.png?size=200x200&set=set1","coalition":"Assembly","status":"online","games":74,"wins":14,"ratio":0.19,"achievements":["Achievement 1","Achievement 2"],"score":1547},
	{"id":87,"name":"Burkin","image":"https://robohash.org/reiciendisnumquamnecessitatibus.png?size=200x200&set=set1","coalition":"Order","status":"ingame","games":1,"wins":0,"ratio":0.0,"achievements":["Achievement 1","Achievement 2"],"score":10},
	{"id":88,"name":"Tibb","image":"https://robohash.org/exercitationemomnisvoluptatem.png?size=200x200&set=set1","coalition":"Order","status":"offline","games":39,"wins":20,"ratio":0.51,"achievements":["Achievement 1","Achievement 2"],"score":1796},
	{"id":89,"name":"Pothecary","image":"https://robohash.org/numquamautomnis.png?size=200x200&set=set1","coalition":"Alliance","status":"online","games":94,"wins":47,"ratio":0.5,"achievements":["Achievement 1","Achievement 2"],"score":4230},
	{"id":90,"name":"Tomson","image":"https://robohash.org/voluptatemeaquedeleniti.png?size=200x200&set=set1","coalition":"Order","status":"online","games":18,"wins":0,"ratio":0.0,"achievements":["Achievement 1","Achievement 2"],"score":180},
	{"id":91,"name":"Steagall","image":"https://robohash.org/doloremminimaet.png?size=200x200&set=set1","coalition":"Federation","status":"offline","games":84,"wins":7,"ratio":0.08,"achievements":["Achievement 1","Achievement 2"],"score":1209},
	{"id":92,"name":"Saxelby","image":"https://robohash.org/suntvoluptatenemo.png?size=200x200&set=set1","coalition":"Assembly","status":"online","games":78,"wins":30,"ratio":0.39,"achievements":["Achievement 1","Achievement 2"],"score":2752},
	{"id":93,"name":"Stripp","image":"https://robohash.org/sedvoluptasrerum.png?size=200x200&set=set1","coalition":"Order","status":"offline","games":63,"wins":22,"ratio":0.35,"achievements":["Achievement 1","Achievement 2"],"score":2038},
	{"id":94,"name":"Radleigh","image":"https://robohash.org/aliastotamullam.png?size=200x200&set=set1","coalition":"Federation","status":"offline","games":30,"wins":10,"ratio":0.33,"achievements":["Achievement 1","Achievement 2"],"score":931},
	{"id":95,"name":"Forster","image":"https://robohash.org/reprehenderitdelenitidignissimos.png?size=200x200&set=set1","coalition":"Order","status":"online","games":79,"wins":9,"ratio":0.11,"achievements":["Achievement 1","Achievement 2"],"score":1276},
	{"id":96,"name":"Ricardot","image":"https://robohash.org/sapientequamet.png?size=200x200&set=set1","coalition":"Alliance","status":"online","games":43,"wins":32,"ratio":0.74,"achievements":["Achievement 1","Achievement 2"],"score":2975},
	{"id":97,"name":"Bambury","image":"https://robohash.org/debitismolestiasnon.png?size=200x200&set=set1","coalition":"Federation","status":"ingame","games":46,"wins":37,"ratio":0.8,"achievements":["Achievement 1","Achievement 2"],"score":3492},
	{"id":98,"name":"Benedicte","image":"https://robohash.org/ipsumetincidunt.png?size=200x200&set=set1","coalition":"Assembly","status":"offline","games":90,"wins":12,"ratio":0.13,"achievements":["Achievement 1","Achievement 2"],"score":1559},
	{"id":99,"name":"Mc Grath","image":"https://robohash.org/utdoloreum.png?size=200x200&set=set1","coalition":"Alliance","status":"offline","games":35,"wins":32,"ratio":0.91,"achievements":["Achievement 1","Achievement 2"],"score":3113},
	{"id":100,"name":"Greenhall","image":"https://robohash.org/omnissedpariatur.png?size=200x200&set=set1","coalition":"Alliance","status":"offline","games":94,"wins":68,"ratio":0.72,"achievements":["Achievement 1","Achievement 2"],"score":6295},
	{"id":101,"name":"Frith","image":"https://robohash.org/rerumatqueipsum.png?size=200x200&set=set1","coalition":"Assembly","status":"offline","games":29,"wins":7,"ratio":0.24,"achievements":["Achievement 1","Achievement 2"],"score":706},
	{"id":102,"name":"Elliss","image":"https://robohash.org/utfugiatquia.png?size=200x200&set=set1","coalition":"Order","status":"ingame","games":15,"wins":12,"ratio":0.8,"achievements":["Achievement 1","Achievement 2"],"score":1134},
	{"id":103,"name":"Leipnik","image":"https://robohash.org/utautest.png?size=200x200&set=set1","coalition":"Assembly","status":"online","games":31,"wins":30,"ratio":0.97,"achievements":["Achievement 1","Achievement 2"],"score":2974},
];

//prettier-ignore
const blocked: IUser[] = [
	{"id":230,"name":"O'Fairy","image":"https://robohash.org/rerumatqueanimi.png?size=200x200&set=set1","coalition":"Alliance","status":"online","games":41,"wins":21,"ratio":0.51,"achievements":["Achievement 1","Achievement 2"],"score":1887},
	{"id":231,"name":"Lintott","image":"https://robohash.org/aperiamdoloreset.png?size=200x200&set=set1","coalition":"Federation","status":"ingame","games":5,"wins":5,"ratio":1.0,"achievements":["Achievement 1","Achievement 2"],"score":500},
	{"id":232,"name":"Ainsbury","image":"https://robohash.org/eosdignissimosid.png?size=200x200&set=set1","coalition":"Alliance","status":"offline","games":90,"wins":28,"ratio":0.31,"achievements":["Achievement 1","Achievement 2"],"score":2646},
	{"id":233,"name":"Aspy","image":"https://robohash.org/etnumquamdistinctio.png?size=200x200&set=set1","coalition":"Alliance","status":"ingame","games":30,"wins":20,"ratio":0.67,"achievements":["Achievement 1","Achievement 2"],"score":1837},
	{"id":234,"name":"Yurov","image":"https://robohash.org/asperioresaccusamusdolores.png?size=200x200&set=set1","coalition":"Federation","status":"offline","games":46,"wins":32,"ratio":0.7,"achievements":["Achievement 1","Achievement 2"],"score":2958},
	{"id":235,"name":"Wharlton","image":"https://robohash.org/dolorsitquos.png?size=200x200&set=set1","coalition":"Federation","status":"ingame","games":42,"wins":6,"ratio":0.14,"achievements":["Achievement 1","Achievement 2"],"score":752},
	{"id":236,"name":"Sommerly","image":"https://robohash.org/quaequiofficiis.png?size=200x200&set=set1","coalition":"Alliance","status":"offline","games":14,"wins":11,"ratio":0.79,"achievements":["Achievement 1","Achievement 2"],"score":1038},
	{"id":237,"name":"Blackeby","image":"https://robohash.org/debitisdoloremquevero.png?size=200x200&set=set1","coalition":"Order","status":"offline","games":92,"wins":22,"ratio":0.24,"achievements":["Achievement 1","Achievement 2"],"score":2232},
	{"id":238,"name":"Alliban","image":"https://robohash.org/etsimiliqueminus.png?size=200x200&set=set1","coalition":"Federation","status":"offline","games":73,"wins":51,"ratio":0.7,"achievements":["Achievement 1","Achievement 2"],"score":4709},
	{"id":239,"name":"Ricarde","image":"https://robohash.org/voluptatibuscommodiquisquam.png?size=200x200&set=set1","coalition":"Order","status":"ingame","games":1,"wins":0,"ratio":0.0,"achievements":["Achievement 1","Achievement 2"],"score":10},
	{"id":240,"name":"Matchett","image":"https://robohash.org/quosipsaquo.png?size=200x200&set=set1","coalition":"Federation","status":"ingame","games":71,"wins":31,"ratio":0.44,"achievements":["Achievement 1","Achievement 2"],"score":2808},
	{"id":241,"name":"Marzelo","image":"https://robohash.org/inventoreconsequaturlaborum.png?size=200x200&set=set1","coalition":"Order","status":"offline","games":58,"wins":56,"ratio":0.97,"achievements":["Achievement 1","Achievement 2"],"score":5555},
	{"id":242,"name":"Wollrauch","image":"https://robohash.org/eteumquasi.png?size=200x200&set=set1","coalition":"Alliance","status":"online","games":11,"wins":8,"ratio":0.73,"achievements":["Achievement 1","Achievement 2"],"score":743},
	{"id":243,"name":"Ashburne","image":"https://robohash.org/rerumipsaest.png?size=200x200&set=set1","coalition":"Federation","status":"ingame","games":83,"wins":77,"ratio":0.93,"achievements":["Achievement 1","Achievement 2"],"score":7546},
	{"id":244,"name":"Geaves","image":"https://robohash.org/nesciuntrepudiandaetempore.png?size=200x200&set=set1","coalition":"Order","status":"ingame","games":52,"wins":33,"ratio":0.64,"achievements":["Achievement 1","Achievement 2"],"score":3017},
	{"id":245,"name":"Mohammad","image":"https://robohash.org/accusamusullampraesentium.png?size=200x200&set=set1","coalition":"Alliance","status":"offline","games":94,"wins":25,"ratio":0.27,"achievements":["Achievement 1","Achievement 2"],"score":2463},
	{"id":246,"name":"Alans","image":"https://robohash.org/nobistemporibusqui.png?size=200x200&set=set1","coalition":"Assembly","status":"offline","games":7,"wins":7,"ratio":1.0,"achievements":["Achievement 1","Achievement 2"],"score":700},
	{"id":247,"name":"Barthel","image":"https://robohash.org/asequiaut.png?size=200x200&set=set1","coalition":"Order","status":"offline","games":1,"wins":0,"ratio":0.0,"achievements":["Achievement 1","Achievement 2"],"score":10},
	{"id":248,"name":"Berthon","image":"https://robohash.org/evenietquisquamatque.png?size=200x200&set=set1","coalition":"Assembly","status":"online","games":15,"wins":13,"ratio":0.87,"achievements":["Achievement 1","Achievement 2"],"score":1252},
	{"id":249,"name":"Sauvage","image":"https://robohash.org/undenonut.png?size=200x200&set=set1","coalition":"Order","status":"offline","games":19,"wins":19,"ratio":1.0,"achievements":["Achievement 1","Achievement 2"],"score":1900},
	{"id":250,"name":"Benbrick","image":"https://robohash.org/quietfacere.png?size=200x200&set=set1","coalition":"Federation","status":"ingame","games":92,"wins":63,"ratio":0.69,"achievements":["Achievement 1","Achievement 2"],"score":5813},
	{"id":251,"name":"Blaycock","image":"https://robohash.org/corporiseligendiquam.png?size=200x200&set=set1","coalition":"Assembly","status":"online","games":78,"wins":45,"ratio":0.58,"achievements":["Achievement 1","Achievement 2"],"score":4076},
	{"id":252,"name":"Ragbourne","image":"https://robohash.org/nullaaliquamofficiis.png?size=200x200&set=set1","coalition":"Order","status":"online","games":43,"wins":4,"ratio":0.09,"achievements":["Achievement 1","Achievement 2"],"score":643},
	{"id":253,"name":"Rosensaft","image":"https://robohash.org/fugiatestoptio.png?size=200x200&set=set1","coalition":"Alliance","status":"ingame","games":58,"wins":46,"ratio":0.79,"achievements":["Achievement 1","Achievement 2"],"score":4331},
	{"id":254,"name":"Crilley","image":"https://robohash.org/eumquaeconsequatur.png?size=200x200&set=set1","coalition":"Assembly","status":"offline","games":48,"wins":29,"ratio":0.6,"achievements":["Achievement 1","Achievement 2"],"score":2624},
	{"id":255,"name":"Dank","image":"https://robohash.org/suntmagnamdeleniti.png?size=200x200&set=set1","coalition":"Alliance","status":"online","games":96,"wins":69,"ratio":0.72,"achievements":["Achievement 1","Achievement 2"],"score":6398},
	{"id":256,"name":"Lopes","image":"https://robohash.org/molestiaeutamet.png?size=200x200&set=set1","coalition":"Alliance","status":"online","games":37,"wins":15,"ratio":0.41,"achievements":["Achievement 1","Achievement 2"],"score":1367},
	{"id":257,"name":"Longstaffe","image":"https://robohash.org/officiaadipisciesse.png?size=200x200&set=set1","coalition":"Alliance","status":"offline","games":83,"wins":28,"ratio":0.34,"achievements":["Achievement 1","Achievement 2"],"score":2613},
	{"id":258,"name":"Dominka","image":"https://robohash.org/earumcupiditatedistinctio.png?size=200x200&set=set1","coalition":"Alliance","status":"ingame","games":7,"wins":6,"ratio":0.86,"achievements":["Achievement 1","Achievement 2"],"score":576},
	{"id":259,"name":"Renol","image":"https://robohash.org/mollitiaetincidunt.png?size=200x200&set=set1","coalition":"Alliance","status":"ingame","games":7,"wins":3,"ratio":0.43,"achievements":["Achievement 1","Achievement 2"],"score":271},
	{"id":260,"name":"Ferrant","image":"https://robohash.org/quiautquo.png?size=200x200&set=set1","coalition":"Alliance","status":"online","games":84,"wins":72,"ratio":0.86,"achievements":["Achievement 1","Achievement 2"],"score":6919},
	{"id":261,"name":"Doll","image":"https://robohash.org/veritatiseumut.png?size=200x200&set=set1","coalition":"Order","status":"ingame","games":62,"wins":28,"ratio":0.45,"achievements":["Achievement 1","Achievement 2"],"score":2523},
	{"id":262,"name":"Crumpe","image":"https://robohash.org/autemvoluptatesomnis.png?size=200x200&set=set1","coalition":"Federation","status":"online","games":31,"wins":7,"ratio":0.23,"achievements":["Achievement 1","Achievement 2"],"score":725},
	{"id":263,"name":"Beves","image":"https://robohash.org/quasietest.png?size=200x200&set=set1","coalition":"Alliance","status":"offline","games":12,"wins":10,"ratio":0.83,"achievements":["Achievement 1","Achievement 2"],"score":951},
	{"id":264,"name":"Andrichak","image":"https://robohash.org/natusfugiteius.png?size=200x200&set=set1","coalition":"Order","status":"online","games":64,"wins":46,"ratio":0.72,"achievements":["Achievement 1","Achievement 2"],"score":4265},
	{"id":265,"name":"Hauxley","image":"https://robohash.org/nihilipsamreiciendis.png?size=200x200&set=set1","coalition":"Assembly","status":"ingame","games":94,"wins":42,"ratio":0.45,"achievements":["Achievement 1","Achievement 2"],"score":3799},
	{"id":266,"name":"Matuszak","image":"https://robohash.org/teneturculpaerror.png?size=200x200&set=set1","coalition":"Alliance","status":"ingame","games":15,"wins":14,"ratio":0.93,"achievements":["Achievement 1","Achievement 2"],"score":1370},
	{"id":267,"name":"Feckey","image":"https://robohash.org/cumoptioaut.png?size=200x200&set=set1","coalition":"Order","status":"offline","games":69,"wins":41,"ratio":0.59,"achievements":["Achievement 1","Achievement 2"],"score":3704},
	{"id":268,"name":"McKeaveney","image":"https://robohash.org/doloresquiaexpedita.png?size=200x200&set=set1","coalition":"Federation","status":"offline","games":2,"wins":0,"ratio":0.0,"achievements":["Achievement 1","Achievement 2"],"score":20},
	{"id":269,"name":"Stag","image":"https://robohash.org/placeatnihilautem.png?size=200x200&set=set1","coalition":"Assembly","status":"ingame","games":66,"wins":4,"ratio":0.06,"achievements":["Achievement 1","Achievement 2"],"score":869},
	{"id":270,"name":"Jeacop","image":"https://robohash.org/repellatoccaecatiin.png?size=200x200&set=set1","coalition":"Order","status":"offline","games":8,"wins":3,"ratio":0.38,"achievements":["Achievement 1","Achievement 2"],"score":276},
	{"id":271,"name":"Goretti","image":"https://robohash.org/nisifugaaut.png?size=200x200&set=set1","coalition":"Assembly","status":"online","games":34,"wins":16,"ratio":0.47,"achievements":["Achievement 1","Achievement 2"],"score":1440},
	{"id":272,"name":"Strover","image":"https://robohash.org/consequaturnequeamet.png?size=200x200&set=set1","coalition":"Order","status":"online","games":10,"wins":8,"ratio":0.8,"achievements":["Achievement 1","Achievement 2"],"score":756},
	{"id":273,"name":"Clohissy","image":"https://robohash.org/laboriosamquiamagni.png?size=200x200&set=set1","coalition":"Alliance","status":"online","games":43,"wins":15,"ratio":0.35,"achievements":["Achievement 1","Achievement 2"],"score":1390},
	{"id":274,"name":"Whitmore","image":"https://robohash.org/illoestdolores.png?size=200x200&set=set1","coalition":"Federation","status":"offline","games":4,"wins":4,"ratio":1.0,"achievements":["Achievement 1","Achievement 2"],"score":400},
	{"id":275,"name":"Vlasenkov","image":"https://robohash.org/cupiditatenihilexpedita.png?size=200x200&set=set1","coalition":"Assembly","status":"online","games":71,"wins":32,"ratio":0.45,"achievements":["Achievement 1","Achievement 2"],"score":2885},
	{"id":276,"name":"Trinkwon","image":"https://robohash.org/accusantiuminventoreofficia.png?size=200x200&set=set1","coalition":"Alliance","status":"offline","games":89,"wins":55,"ratio":0.62,"achievements":["Achievement 1","Achievement 2"],"score":5005},
	{"id":277,"name":"Teligin","image":"https://robohash.org/quidictaporro.png?size=200x200&set=set1","coalition":"Assembly","status":"online","games":47,"wins":4,"ratio":0.09,"achievements":["Achievement 1","Achievement 2"],"score":686},
	{"id":278,"name":"Gutherson","image":"https://robohash.org/providentrerumest.png?size=200x200&set=set1","coalition":"Order","status":"ingame","games":62,"wins":62,"ratio":1.0,"achievements":["Achievement 1","Achievement 2"],"score":6200},
	{"id":279,"name":"Bundock","image":"https://robohash.org/commodivoluptasnulla.png?size=200x200&set=set1","coalition":"Alliance","status":"ingame","games":8,"wins":2,"ratio":0.25,"achievements":["Achievement 1","Achievement 2"],"score":200},
	{"id":280,"name":"Tilby","image":"https://robohash.org/molestiaemagnidolore.png?size=200x200&set=set1","coalition":"Order","status":"offline","games":82,"wins":73,"ratio":0.89,"achievements":["Achievement 1","Achievement 2"],"score":7068},
	{"id":281,"name":"Ilyunin","image":"https://robohash.org/remvoluptatibusoptio.png?size=200x200&set=set1","coalition":"Order","status":"offline","games":35,"wins":19,"ratio":0.54,"achievements":["Achievement 1","Achievement 2"],"score":1709},
	{"id":282,"name":"Atton","image":"https://robohash.org/voluptaseosplaceat.png?size=200x200&set=set1","coalition":"Assembly","status":"ingame","games":33,"wins":32,"ratio":0.97,"achievements":["Achievement 1","Achievement 2"],"score":3171},
];

function filterByName(friend: IUser, search: string): boolean {
	return friend.name
		.normalize('NFD')
		.toLowerCase()
		.includes(search.normalize('NFD').toLowerCase());
}

const {Search} = Input;

function Social() {
	const [search, setSearch] = useState('');
	const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	};

	return (
		<S.Container>
			<Search
				placeholder="Search a user"
				size="large"
				onChange={onSearch}
				style={{
					width: '50%',
				}}
				enterButton
			/>
			<F.H3>
				Friends -{' '}
				{friends.filter((friend) => filterByName(friend, search)).length}
			</F.H3>
			<S.UserContainer>
				{friends
					.sort(compareStatus)
					.filter((friend) => filterByName(friend, search))
					.map((friend: IUser) => (
						<Friend friend={friend} key={friend.id} />
					))}
			</S.UserContainer>
			<Divider style={{visibility: 'hidden'}} />
			<F.H3>
				Blocked -{' '}
				{blocked.filter((blocked) => filterByName(blocked, search)).length}
			</F.H3>
			<S.UserContainer>
				{blocked
					.filter((user) =>
						user.name
							.normalize('NFD')
							.toLowerCase()
							.includes(search.normalize('NFD').toLowerCase())
					)
					.map((user: IUser) => (
						<Blocked user={user} key={user.id} />
					))}
			</S.UserContainer>
		</S.Container>
	);
}

export default Social;
