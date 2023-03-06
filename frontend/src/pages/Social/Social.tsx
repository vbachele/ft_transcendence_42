import { useState } from "react";
import { IUser } from "types/models";
import { Divider, Input } from "antd";
import Friend from "./components/Friend";
import * as S from "./Social.styles";
import * as F from "styles/font.styles";
import compareStatus from "helpers/compareStatus";
import Blocked from "./components/Blocked";
import filterByName from "helpers/filterByName";

// prettier-ignore
const friends: IUser[] = [
	{"name":"Minnis","image":"https://robohash.org/quiquaeratcorrupti.png?size=200x200&set=set1","coalition":"Assembly","status":"ingame","games":16,"wins":6,"ratio":0.38,"achievements":["Achievement 1","Achievement 2"],"score":552},
	{"name":"Dalston","image":"https://robohash.org/estvoluptasest.png?size=200x200&set=set1","coalition":"Assembly","status":"online","games":33,"wins":0,"ratio":0.0,"achievements":["Achievement 1","Achievement 2"],"score":330},
	{"name":"Toppin","image":"https://robohash.org/explicaboundesint.png?size=200x200&set=set1","coalition":"Order","status":"offline","games":43,"wins":41,"ratio":0.95,"achievements":["Achievement 1","Achievement 2"],"score":4036},
	{"name":"Coleman","image":"https://robohash.org/doloresbeataeculpa.png?size=200x200&set=set1","coalition":"Assembly","status":"ingame","games":30,"wins":1,"ratio":0.03,"achievements":["Achievement 1","Achievement 2"],"score":350},
	{"name":"Helder","image":"https://robohash.org/sitveropossimus.png?size=200x200&set=set1","coalition":"Federation","status":"ingame","games":69,"wins":59,"ratio":0.86,"achievements":["Achievement 1","Achievement 2"],"score":5673},
	{"name":"Kingcott","image":"https://robohash.org/magnisitvoluptatibus.png?size=200x200&set=set1","coalition":"Order","status":"online","games":23,"wins":23,"ratio":1.0,"achievements":["Achievement 1","Achievement 2"],"score":2300},
	{"name":"Tripett","image":"https://robohash.org/expeditaaperiamet.png?size=200x200&set=set1","coalition":"Assembly","status":"offline","games":13,"wins":1,"ratio":0.08,"achievements":["Achievement 1","Achievement 2"],"score":183},
	{"name":"Gummory","image":"https://robohash.org/eumeoset.png?size=200x200&set=set1","coalition":"Assembly","status":"ingame","games":3,"wins":3,"ratio":1.0,"achievements":["Achievement 1","Achievement 2"],"score":300},
	{"name":"Doddemeade","image":"https://robohash.org/omnisundedoloribus.png?size=200x200&set=set1","coalition":"Alliance","status":"offline","games":71,"wins":28,"ratio":0.39,"achievements":["Achievement 1","Achievement 2"],"score":2543},
	{"name":"Esser","image":"https://robohash.org/suntfugitet.png?size=200x200&set=set1","coalition":"Assembly","status":"offline","games":31,"wins":22,"ratio":0.71,"achievements":["Achievement 1","Achievement 2"],"score":2034},
	{"name":"Laval","image":"https://robohash.org/repellendusnemout.png?size=200x200&set=set1","coalition":"Alliance","status":"online","games":65,"wins":25,"ratio":0.39,"achievements":["Achievement 1","Achievement 2"],"score":2293},
	{"name":"Ambroziak","image":"https://robohash.org/occaecatioptionam.png?size=200x200&set=set1","coalition":"Federation","status":"offline","games":62,"wins":52,"ratio":0.84,"achievements":["Achievement 1","Achievement 2"],"score":4968},
	{"name":"Snoddin","image":"https://robohash.org/quamplaceatmollitia.png?size=200x200&set=set1","coalition":"Alliance","status":"online","games":75,"wins":46,"ratio":0.61,"achievements":["Achievement 1","Achievement 2"],"score":4169},
	{"name":"Barson","image":"https://robohash.org/nihildebitispossimus.png?size=200x200&set=set1","coalition":"Order","status":"offline","games":92,"wins":83,"ratio":0.9,"achievements":["Achievement 1","Achievement 2"],"score":8056},
	{"name":"Campbell-Dunlop","image":"https://robohash.org/rationevelitipsam.png?size=200x200&set=set1","coalition":"Alliance","status":"online","games":17,"wins":3,"ratio":0.18,"achievements":["Achievement 1","Achievement 2"],"score":342},
	{"name":"Wimbush","image":"https://robohash.org/recusandaeutvoluptas.png?size=200x200&set=set1","coalition":"Alliance","status":"online","games":49,"wins":36,"ratio":0.74,"achievements":["Achievement 1","Achievement 2"],"score":3358},
	{"name":"Royse","image":"https://robohash.org/delectusaliquidut.png?size=200x200&set=set1","coalition":"Order","status":"ingame","games":57,"wins":8,"ratio":0.14,"achievements":["Achievement 1","Achievement 2"],"score":1014},
	{"name":"Gilks","image":"https://robohash.org/impeditdebitisiusto.png?size=200x200&set=set1","coalition":"Order","status":"offline","games":49,"wins":32,"ratio":0.65,"achievements":["Achievement 1","Achievement 2"],"score":2920},
	{"name":"Radwell","image":"https://robohash.org/enimnumquamaut.png?size=200x200&set=set1","coalition":"Alliance","status":"online","games":39,"wins":32,"ratio":0.82,"achievements":["Achievement 1","Achievement 2"],"score":3039},
	{"name":"Cattrall","image":"https://robohash.org/iddolorillum.png?size=200x200&set=set1","coalition":"Order","status":"ingame","games":64,"wins":60,"ratio":0.94,"achievements":["Achievement 1","Achievement 2"],"score":5897},
	{"name":"Shere","image":"https://robohash.org/consequaturaspernatureum.png?size=200x200&set=set1","coalition":"Federation","status":"ingame","games":4,"wins":4,"ratio":1.0,"achievements":["Achievement 1","Achievement 2"],"score":400},
	{"name":"Kubis","image":"https://robohash.org/quonondeleniti.png?size=200x200&set=set1","coalition":"Order","status":"offline","games":79,"wins":37,"ratio":0.47,"achievements":["Achievement 1","Achievement 2"],"score":3336},
	{"name":"Crowley","image":"https://robohash.org/aliquamsitlaboriosam.png?size=200x200&set=set1","coalition":"Federation","status":"ingame","games":66,"wins":28,"ratio":0.42,"achievements":["Achievement 1","Achievement 2"],"score":2527},
	{"name":"Gready","image":"https://robohash.org/atquisquamsit.png?size=200x200&set=set1","coalition":"Alliance","status":"online","games":99,"wins":83,"ratio":0.84,"achievements":["Achievement 1","Achievement 2"],"score":7930},
	{"name":"Mityushin","image":"https://robohash.org/quiadeserunterror.png?size=200x200&set=set1","coalition":"Alliance","status":"offline","games":12,"wins":4,"ratio":0.33,"achievements":["Achievement 1","Achievement 2"],"score":372},
	{"name":"Fincher","image":"https://robohash.org/auterroradipisci.png?size=200x200&set=set1","coalition":"Alliance","status":"ingame","games":10,"wins":6,"ratio":0.6,"achievements":["Achievement 1","Achievement 2"],"score":544},
	{"name":"Liepina","image":"https://robohash.org/officiisanimisint.png?size=200x200&set=set1","coalition":"Federation","status":"offline","games":55,"wins":21,"ratio":0.38,"achievements":["Achievement 1","Achievement 2"],"score":1918},
	{"name":"Melato","image":"https://robohash.org/quidemlaborumconsequuntur.png?size=200x200&set=set1","coalition":"Alliance","status":"ingame","games":50,"wins":48,"ratio":0.96,"achievements":["Achievement 1","Achievement 2"],"score":4743},
	{"name":"Lemoir","image":"https://robohash.org/voluptatemdoloremat.png?size=200x200&set=set1","coalition":"Assembly","status":"ingame","games":14,"wins":2,"ratio":0.14,"achievements":["Achievement 1","Achievement 2"],"score":250},
	{"name":"Bess","image":"https://robohash.org/providentquaeratet.png?size=200x200&set=set1","coalition":"Assembly","status":"offline","games":57,"wins":45,"ratio":0.79,"achievements":["Achievement 1","Achievement 2"],"score":4242},
	{"name":"Thowes","image":"https://robohash.org/veniamestoccaecati.png?size=200x200&set=set1","coalition":"Order","status":"offline","games":96,"wins":3,"ratio":0.03,"achievements":["Achievement 1","Achievement 2"],"score":1112},
	{"name":"Werrett","image":"https://robohash.org/suntharumiste.png?size=200x200&set=set1","coalition":"Assembly","status":"online","games":4,"wins":0,"ratio":0.0,"achievements":["Achievement 1","Achievement 2"],"score":40},
	{"name":"Jandl","image":"https://robohash.org/animietfugit.png?size=200x200&set=set1","coalition":"Assembly","status":"offline","games":31,"wins":4,"ratio":0.13,"achievements":["Achievement 1","Achievement 2"],"score":531},
	{"name":"Crain","image":"https://robohash.org/situtvoluptates.png?size=200x200&set=set1","coalition":"Alliance","status":"online","games":78,"wins":28,"ratio":0.36,"achievements":["Achievement 1","Achievement 2"],"score":2584},
	{"name":"Swindells","image":"https://robohash.org/blanditiisquivoluptates.png?size=200x200&set=set1","coalition":"Federation","status":"ingame","games":44,"wins":22,"ratio":0.5,"achievements":["Achievement 1","Achievement 2"],"score":1980},
	{"name":"Pandey","image":"https://robohash.org/sedlaborumrepellat.png?size=200x200&set=set1","coalition":"Federation","status":"ingame","games":96,"wins":8,"ratio":0.08,"achievements":["Achievement 1","Achievement 2"],"score":1382},
	{"name":"Owtram","image":"https://robohash.org/doloremillummaiores.png?size=200x200&set=set1","coalition":"Federation","status":"ingame","games":2,"wins":0,"ratio":0.0,"achievements":["Achievement 1","Achievement 2"],"score":20},
	{"name":"Blencowe","image":"https://robohash.org/perspiciatisettempore.png?size=200x200&set=set1","coalition":"Federation","status":"online","games":82,"wins":72,"ratio":0.88,"achievements":["Achievement 1","Achievement 2"],"score":6956},
	{"name":"Loader","image":"https://robohash.org/nonetducimus.png?size=200x200&set=set1","coalition":"Federation","status":"online","games":51,"wins":10,"ratio":0.2,"achievements":["Achievement 1","Achievement 2"],"score":1092},
	{"name":"Rosetti","image":"https://robohash.org/nihilquoest.png?size=200x200&set=set1","coalition":"Federation","status":"ingame","games":63,"wins":6,"ratio":0.1,"achievements":["Achievement 1","Achievement 2"],"score":957},
	{"name":"Gairdner","image":"https://robohash.org/modiimpeditfuga.png?size=200x200&set=set1","coalition":"Assembly","status":"offline","games":55,"wins":23,"ratio":0.42,"achievements":["Achievement 1","Achievement 2"],"score":2087},
	{"name":"Brotherton","image":"https://robohash.org/atquisut.png?size=200x200&set=set1","coalition":"Assembly","status":"ingame","games":40,"wins":40,"ratio":1.0,"achievements":["Achievement 1","Achievement 2"],"score":4000},
	{"name":"De Benedetti","image":"https://robohash.org/ducimusmodifacilis.png?size=200x200&set=set1","coalition":"Order","status":"ingame","games":37,"wins":5,"ratio":0.14,"achievements":["Achievement 1","Achievement 2"],"score":649},
	{"name":"Nickless","image":"https://robohash.org/similiquefacilisrem.png?size=200x200&set=set1","coalition":"Order","status":"online","games":66,"wins":4,"ratio":0.06,"achievements":["Achievement 1","Achievement 2"],"score":869},
	{"name":"Shelmerdine","image":"https://robohash.org/sitametaccusantium.png?size=200x200&set=set1","coalition":"Federation","status":"offline","games":31,"wins":0,"ratio":0.0,"achievements":["Achievement 1","Achievement 2"],"score":310},
	{"name":"Stickland","image":"https://robohash.org/quasiporrotemporibus.png?size=200x200&set=set1","coalition":"Assembly","status":"offline","games":86,"wins":0,"ratio":0.0,"achievements":["Achievement 1","Achievement 2"],"score":860},
	{"name":"Normanville","image":"https://robohash.org/eumdignissimosconsequatur.png?size=200x200&set=set1","coalition":"Assembly","status":"online","games":84,"wins":23,"ratio":0.27,"achievements":["Achievement 1","Achievement 2"],"score":2235},
	{"name":"Patria","image":"https://robohash.org/seddoloreplaceat.png?size=200x200&set=set1","coalition":"Assembly","status":"online","games":48,"wins":46,"ratio":0.96,"achievements":["Achievement 1","Achievement 2"],"score":4547},
	{"name":"Pantone","image":"https://robohash.org/vitaehicconsectetur.png?size=200x200&set=set1","coalition":"Federation","status":"ingame","games":5,"wins":2,"ratio":0.4,"achievements":["Achievement 1","Achievement 2"],"score":182},
	{"name":"Berrie","image":"https://robohash.org/culpaminimafacilis.png?size=200x200&set=set1","coalition":"Alliance","status":"ingame","games":42,"wins":7,"ratio":0.17,"achievements":["Achievement 1","Achievement 2"],"score":819},
	{"name":"Deaville","image":"https://robohash.org/perspiciatiseosamet.png?size=200x200&set=set1","coalition":"Assembly","status":"online","games":77,"wins":61,"ratio":0.79,"achievements":["Achievement 1","Achievement 2"],"score":5745},
	{"name":"Pierse","image":"https://robohash.org/eiusquinesciunt.png?size=200x200&set=set1","coalition":"Federation","status":"ingame","games":9,"wins":6,"ratio":0.67,"achievements":["Achievement 1","Achievement 2"],"score":551},
	{"name":"Vallantine","image":"https://robohash.org/excepturidoloremquia.png?size=200x200&set=set1","coalition":"Federation","status":"ingame","games":92,"wins":57,"ratio":0.62,"achievements":["Achievement 1","Achievement 2"],"score":5184},
	{"name":"Shiliton","image":"https://robohash.org/minimaetblanditiis.png?size=200x200&set=set1","coalition":"Alliance","status":"online","games":3,"wins":3,"ratio":1.0,"achievements":["Achievement 1","Achievement 2"],"score":300},
	{"name":"Mellody","image":"https://robohash.org/aliquidmagniiure.png?size=200x200&set=set1","coalition":"Federation","status":"offline","games":22,"wins":2,"ratio":0.09,"achievements":["Achievement 1","Achievement 2"],"score":327},
	{"name":"Enever","image":"https://robohash.org/totamautsint.png?size=200x200&set=set1","coalition":"Alliance","status":"online","games":93,"wins":74,"ratio":0.8,"achievements":["Achievement 1","Achievement 2"],"score":7002},
	{"name":"Bothbie","image":"https://robohash.org/autnonblanditiis.png?size=200x200&set=set1","coalition":"Federation","status":"ingame","games":82,"wins":53,"ratio":0.65,"achievements":["Achievement 1","Achievement 2"],"score":4851},
	{"name":"Brahms","image":"https://robohash.org/eapariaturin.png?size=200x200&set=set1","coalition":"Alliance","status":"online","games":83,"wins":15,"ratio":0.18,"achievements":["Achievement 1","Achievement 2"],"score":1687},
	{"name":"Ellam","image":"https://robohash.org/iustovoluptassint.png?size=200x200&set=set1","coalition":"Alliance","status":"ingame","games":73,"wins":16,"ratio":0.22,"achievements":["Achievement 1","Achievement 2"],"score":1671},
	{"name":"Cartwight","image":"https://robohash.org/reiciendisminuspossimus.png?size=200x200&set=set1","coalition":"Federation","status":"ingame","games":54,"wins":8,"ratio":0.15,"achievements":["Achievement 1","Achievement 2"],"score":989},
	{"name":"Banthorpe","image":"https://robohash.org/liberoexpeditaquis.png?size=200x200&set=set1","coalition":"Order","status":"ingame","games":2,"wins":0,"ratio":0.0,"achievements":["Achievement 1","Achievement 2"],"score":20},
	{"name":"mmmmmmmm","image":"https://robohash.org/officiadolorarchitecto.png?size=200x200&set=set1","coalition":"Federation","status":"ingame","games":49,"wins":9,"ratio":0.18,"achievements":["Achievement 1","Achievement 2"],"score":1003},
	{"name":"Corah","image":"https://robohash.org/quidemarchitectoex.png?size=200x200&set=set1","coalition":"Federation","status":"ingame","games":24,"wins":15,"ratio":0.63,"achievements":["Achievement 1","Achievement 2"],"score":1369},
	{"name":"Galer","image":"https://robohash.org/undeevenietdistinctio.png?size=200x200&set=set1","coalition":"Assembly","status":"online","games":74,"wins":14,"ratio":0.19,"achievements":["Achievement 1","Achievement 2"],"score":1547},
	{"name":"Burkin","image":"https://robohash.org/reiciendisnumquamnecessitatibus.png?size=200x200&set=set1","coalition":"Order","status":"ingame","games":1,"wins":0,"ratio":0.0,"achievements":["Achievement 1","Achievement 2"],"score":10},
	{"name":"Tibb","image":"https://robohash.org/exercitationemomnisvoluptatem.png?size=200x200&set=set1","coalition":"Order","status":"offline","games":39,"wins":20,"ratio":0.51,"achievements":["Achievement 1","Achievement 2"],"score":1796},
	{"name":"Pothecary","image":"https://robohash.org/numquamautomnis.png?size=200x200&set=set1","coalition":"Alliance","status":"online","games":94,"wins":47,"ratio":0.5,"achievements":["Achievement 1","Achievement 2"],"score":4230},
	{"name":"Tomson","image":"https://robohash.org/voluptatemeaquedeleniti.png?size=200x200&set=set1","coalition":"Order","status":"online","games":18,"wins":0,"ratio":0.0,"achievements":["Achievement 1","Achievement 2"],"score":180},
	{"name":"Steagall","image":"https://robohash.org/doloremminimaet.png?size=200x200&set=set1","coalition":"Federation","status":"offline","games":84,"wins":7,"ratio":0.08,"achievements":["Achievement 1","Achievement 2"],"score":1209},
	{"name":"Saxelby","image":"https://robohash.org/suntvoluptatenemo.png?size=200x200&set=set1","coalition":"Assembly","status":"online","games":78,"wins":30,"ratio":0.39,"achievements":["Achievement 1","Achievement 2"],"score":2752},
	{"name":"Stripp","image":"https://robohash.org/sedvoluptasrerum.png?size=200x200&set=set1","coalition":"Order","status":"offline","games":63,"wins":22,"ratio":0.35,"achievements":["Achievement 1","Achievement 2"],"score":2038},
	{"name":"Radleigh","image":"https://robohash.org/aliastotamullam.png?size=200x200&set=set1","coalition":"Federation","status":"offline","games":30,"wins":10,"ratio":0.33,"achievements":["Achievement 1","Achievement 2"],"score":931},
	{"name":"Forster","image":"https://robohash.org/reprehenderitdelenitidignissimos.png?size=200x200&set=set1","coalition":"Order","status":"online","games":79,"wins":9,"ratio":0.11,"achievements":["Achievement 1","Achievement 2"],"score":1276},
	{"name":"Ricardot","image":"https://robohash.org/sapientequamet.png?size=200x200&set=set1","coalition":"Alliance","status":"online","games":43,"wins":32,"ratio":0.74,"achievements":["Achievement 1","Achievement 2"],"score":2975},
	{"name":"Bambury","image":"https://robohash.org/debitismolestiasnon.png?size=200x200&set=set1","coalition":"Federation","status":"ingame","games":46,"wins":37,"ratio":0.8,"achievements":["Achievement 1","Achievement 2"],"score":3492},
	{"name":"Benedicte","image":"https://robohash.org/ipsumetincidunt.png?size=200x200&set=set1","coalition":"Assembly","status":"offline","games":90,"wins":12,"ratio":0.13,"achievements":["Achievement 1","Achievement 2"],"score":1559},
	{"name":"Mc Grath","image":"https://robohash.org/utdoloreum.png?size=200x200&set=set1","coalition":"Alliance","status":"offline","games":35,"wins":32,"ratio":0.91,"achievements":["Achievement 1","Achievement 2"],"score":3113},
	{"name":"Greenhall","image":"https://robohash.org/omnissedpariatur.png?size=200x200&set=set1","coalition":"Alliance","status":"offline","games":94,"wins":68,"ratio":0.72,"achievements":["Achievement 1","Achievement 2"],"score":6295},
	{"name":"Frith","image":"https://robohash.org/rerumatqueipsum.png?size=200x200&set=set1","coalition":"Assembly","status":"offline","games":29,"wins":7,"ratio":0.24,"achievements":["Achievement 1","Achievement 2"],"score":706},
	{"name":"Elliss","image":"https://robohash.org/utfugiatquia.png?size=200x200&set=set1","coalition":"Order","status":"ingame","games":15,"wins":12,"ratio":0.8,"achievements":["Achievement 1","Achievement 2"],"score":1134},
	{"name":"Leipnik","image":"https://robohash.org/utautest.png?size=200x200&set=set1","coalition":"Assembly","status":"online","games":31,"wins":30,"ratio":0.97,"achievements":["Achievement 1","Achievement 2"],"score":2974},
];

//prettier-ignore
const blocked: IUser[] = [
	{"name":"O'Fairy","image":"https://robohash.org/rerumatqueanimi.png?size=200x200&set=set1","coalition":"Alliance","status":"online","games":41,"wins":21,"ratio":0.51,"achievements":["Achievement 1","Achievement 2"],"score":1887},
	{"name":"Lintott","image":"https://robohash.org/aperiamdoloreset.png?size=200x200&set=set1","coalition":"Federation","status":"ingame","games":5,"wins":5,"ratio":1.0,"achievements":["Achievement 1","Achievement 2"],"score":500},
	{"name":"Ainsbury","image":"https://robohash.org/eosdignissimosid.png?size=200x200&set=set1","coalition":"Alliance","status":"offline","games":90,"wins":28,"ratio":0.31,"achievements":["Achievement 1","Achievement 2"],"score":2646},
	{"name":"Aspy","image":"https://robohash.org/etnumquamdistinctio.png?size=200x200&set=set1","coalition":"Alliance","status":"ingame","games":30,"wins":20,"ratio":0.67,"achievements":["Achievement 1","Achievement 2"],"score":1837},
	{"name":"Yurov","image":"https://robohash.org/asperioresaccusamusdolores.png?size=200x200&set=set1","coalition":"Federation","status":"offline","games":46,"wins":32,"ratio":0.7,"achievements":["Achievement 1","Achievement 2"],"score":2958},
	{"name":"Wharlton","image":"https://robohash.org/dolorsitquos.png?size=200x200&set=set1","coalition":"Federation","status":"ingame","games":42,"wins":6,"ratio":0.14,"achievements":["Achievement 1","Achievement 2"],"score":752},
	{"name":"Sommerly","image":"https://robohash.org/quaequiofficiis.png?size=200x200&set=set1","coalition":"Alliance","status":"offline","games":14,"wins":11,"ratio":0.79,"achievements":["Achievement 1","Achievement 2"],"score":1038},
	{"name":"Blackeby","image":"https://robohash.org/debitisdoloremquevero.png?size=200x200&set=set1","coalition":"Order","status":"offline","games":92,"wins":22,"ratio":0.24,"achievements":["Achievement 1","Achievement 2"],"score":2232},
	{"name":"Alliban","image":"https://robohash.org/etsimiliqueminus.png?size=200x200&set=set1","coalition":"Federation","status":"offline","games":73,"wins":51,"ratio":0.7,"achievements":["Achievement 1","Achievement 2"],"score":4709},
	{"name":"Ricarde","image":"https://robohash.org/voluptatibuscommodiquisquam.png?size=200x200&set=set1","coalition":"Order","status":"ingame","games":1,"wins":0,"ratio":0.0,"achievements":["Achievement 1","Achievement 2"],"score":10},
	{"name":"Matchett","image":"https://robohash.org/quosipsaquo.png?size=200x200&set=set1","coalition":"Federation","status":"ingame","games":71,"wins":31,"ratio":0.44,"achievements":["Achievement 1","Achievement 2"],"score":2808},
	{"name":"Marzelo","image":"https://robohash.org/inventoreconsequaturlaborum.png?size=200x200&set=set1","coalition":"Order","status":"offline","games":58,"wins":56,"ratio":0.97,"achievements":["Achievement 1","Achievement 2"],"score":5555},
	{"name":"Wollrauch","image":"https://robohash.org/eteumquasi.png?size=200x200&set=set1","coalition":"Alliance","status":"online","games":11,"wins":8,"ratio":0.73,"achievements":["Achievement 1","Achievement 2"],"score":743},
	{"name":"Ashburne","image":"https://robohash.org/rerumipsaest.png?size=200x200&set=set1","coalition":"Federation","status":"ingame","games":83,"wins":77,"ratio":0.93,"achievements":["Achievement 1","Achievement 2"],"score":7546},
	{"name":"Geaves","image":"https://robohash.org/nesciuntrepudiandaetempore.png?size=200x200&set=set1","coalition":"Order","status":"ingame","games":52,"wins":33,"ratio":0.64,"achievements":["Achievement 1","Achievement 2"],"score":3017},
	{"name":"Mohammad","image":"https://robohash.org/accusamusullampraesentium.png?size=200x200&set=set1","coalition":"Alliance","status":"offline","games":94,"wins":25,"ratio":0.27,"achievements":["Achievement 1","Achievement 2"],"score":2463},
	{"name":"Alans","image":"https://robohash.org/nobistemporibusqui.png?size=200x200&set=set1","coalition":"Assembly","status":"offline","games":7,"wins":7,"ratio":1.0,"achievements":["Achievement 1","Achievement 2"],"score":700},
	{"name":"Barthel","image":"https://robohash.org/asequiaut.png?size=200x200&set=set1","coalition":"Order","status":"offline","games":1,"wins":0,"ratio":0.0,"achievements":["Achievement 1","Achievement 2"],"score":10},
	{"name":"Berthon","image":"https://robohash.org/evenietquisquamatque.png?size=200x200&set=set1","coalition":"Assembly","status":"online","games":15,"wins":13,"ratio":0.87,"achievements":["Achievement 1","Achievement 2"],"score":1252},
	{"name":"Sauvage","image":"https://robohash.org/undenonut.png?size=200x200&set=set1","coalition":"Order","status":"offline","games":19,"wins":19,"ratio":1.0,"achievements":["Achievement 1","Achievement 2"],"score":1900},
	{"name":"Benbrick","image":"https://robohash.org/quietfacere.png?size=200x200&set=set1","coalition":"Federation","status":"ingame","games":92,"wins":63,"ratio":0.69,"achievements":["Achievement 1","Achievement 2"],"score":5813},
	{"name":"Blaycock","image":"https://robohash.org/corporiseligendiquam.png?size=200x200&set=set1","coalition":"Assembly","status":"online","games":78,"wins":45,"ratio":0.58,"achievements":["Achievement 1","Achievement 2"],"score":4076},
	{"name":"Ragbourne","image":"https://robohash.org/nullaaliquamofficiis.png?size=200x200&set=set1","coalition":"Order","status":"online","games":43,"wins":4,"ratio":0.09,"achievements":["Achievement 1","Achievement 2"],"score":643},
	{"name":"Rosensaft","image":"https://robohash.org/fugiatestoptio.png?size=200x200&set=set1","coalition":"Alliance","status":"ingame","games":58,"wins":46,"ratio":0.79,"achievements":["Achievement 1","Achievement 2"],"score":4331},
	{"name":"Crilley","image":"https://robohash.org/eumquaeconsequatur.png?size=200x200&set=set1","coalition":"Assembly","status":"offline","games":48,"wins":29,"ratio":0.6,"achievements":["Achievement 1","Achievement 2"],"score":2624},
	{"name":"Dank","image":"https://robohash.org/suntmagnamdeleniti.png?size=200x200&set=set1","coalition":"Alliance","status":"online","games":96,"wins":69,"ratio":0.72,"achievements":["Achievement 1","Achievement 2"],"score":6398},
	{"name":"Lopes","image":"https://robohash.org/molestiaeutamet.png?size=200x200&set=set1","coalition":"Alliance","status":"online","games":37,"wins":15,"ratio":0.41,"achievements":["Achievement 1","Achievement 2"],"score":1367},
	{"name":"Longstaffe","image":"https://robohash.org/officiaadipisciesse.png?size=200x200&set=set1","coalition":"Alliance","status":"offline","games":83,"wins":28,"ratio":0.34,"achievements":["Achievement 1","Achievement 2"],"score":2613},
	{"name":"Dominka","image":"https://robohash.org/earumcupiditatedistinctio.png?size=200x200&set=set1","coalition":"Alliance","status":"ingame","games":7,"wins":6,"ratio":0.86,"achievements":["Achievement 1","Achievement 2"],"score":576},
	{"name":"Renol","image":"https://robohash.org/mollitiaetincidunt.png?size=200x200&set=set1","coalition":"Alliance","status":"ingame","games":7,"wins":3,"ratio":0.43,"achievements":["Achievement 1","Achievement 2"],"score":271},
	{"name":"Ferrant","image":"https://robohash.org/quiautquo.png?size=200x200&set=set1","coalition":"Alliance","status":"online","games":84,"wins":72,"ratio":0.86,"achievements":["Achievement 1","Achievement 2"],"score":6919},
	{"name":"Doll","image":"https://robohash.org/veritatiseumut.png?size=200x200&set=set1","coalition":"Order","status":"ingame","games":62,"wins":28,"ratio":0.45,"achievements":["Achievement 1","Achievement 2"],"score":2523},
	{"name":"Crumpe","image":"https://robohash.org/autemvoluptatesomnis.png?size=200x200&set=set1","coalition":"Federation","status":"online","games":31,"wins":7,"ratio":0.23,"achievements":["Achievement 1","Achievement 2"],"score":725},
	{"name":"Beves","image":"https://robohash.org/quasietest.png?size=200x200&set=set1","coalition":"Alliance","status":"offline","games":12,"wins":10,"ratio":0.83,"achievements":["Achievement 1","Achievement 2"],"score":951},
	{"name":"Andrichak","image":"https://robohash.org/natusfugiteius.png?size=200x200&set=set1","coalition":"Order","status":"online","games":64,"wins":46,"ratio":0.72,"achievements":["Achievement 1","Achievement 2"],"score":4265},
	{"name":"Hauxley","image":"https://robohash.org/nihilipsamreiciendis.png?size=200x200&set=set1","coalition":"Assembly","status":"ingame","games":94,"wins":42,"ratio":0.45,"achievements":["Achievement 1","Achievement 2"],"score":3799},
	{"name":"Matuszak","image":"https://robohash.org/teneturculpaerror.png?size=200x200&set=set1","coalition":"Alliance","status":"ingame","games":15,"wins":14,"ratio":0.93,"achievements":["Achievement 1","Achievement 2"],"score":1370},
	{"name":"Feckey","image":"https://robohash.org/cumoptioaut.png?size=200x200&set=set1","coalition":"Order","status":"offline","games":69,"wins":41,"ratio":0.59,"achievements":["Achievement 1","Achievement 2"],"score":3704},
	{"name":"McKeaveney","image":"https://robohash.org/doloresquiaexpedita.png?size=200x200&set=set1","coalition":"Federation","status":"offline","games":2,"wins":0,"ratio":0.0,"achievements":["Achievement 1","Achievement 2"],"score":20},
	{"name":"Stag","image":"https://robohash.org/placeatnihilautem.png?size=200x200&set=set1","coalition":"Assembly","status":"ingame","games":66,"wins":4,"ratio":0.06,"achievements":["Achievement 1","Achievement 2"],"score":869},
	{"name":"Jeacop","image":"https://robohash.org/repellatoccaecatiin.png?size=200x200&set=set1","coalition":"Order","status":"offline","games":8,"wins":3,"ratio":0.38,"achievements":["Achievement 1","Achievement 2"],"score":276},
	{"name":"Goretti","image":"https://robohash.org/nisifugaaut.png?size=200x200&set=set1","coalition":"Assembly","status":"online","games":34,"wins":16,"ratio":0.47,"achievements":["Achievement 1","Achievement 2"],"score":1440},
	{"name":"Strover","image":"https://robohash.org/consequaturnequeamet.png?size=200x200&set=set1","coalition":"Order","status":"online","games":10,"wins":8,"ratio":0.8,"achievements":["Achievement 1","Achievement 2"],"score":756},
	{"name":"Clohissy","image":"https://robohash.org/laboriosamquiamagni.png?size=200x200&set=set1","coalition":"Alliance","status":"online","games":43,"wins":15,"ratio":0.35,"achievements":["Achievement 1","Achievement 2"],"score":1390},
	{"name":"Whitmore","image":"https://robohash.org/illoestdolores.png?size=200x200&set=set1","coalition":"Federation","status":"offline","games":4,"wins":4,"ratio":1.0,"achievements":["Achievement 1","Achievement 2"],"score":400},
	{"name":"Vlasenkov","image":"https://robohash.org/cupiditatenihilexpedita.png?size=200x200&set=set1","coalition":"Assembly","status":"online","games":71,"wins":32,"ratio":0.45,"achievements":["Achievement 1","Achievement 2"],"score":2885},
	{"name":"Trinkwon","image":"https://robohash.org/accusantiuminventoreofficia.png?size=200x200&set=set1","coalition":"Alliance","status":"offline","games":89,"wins":55,"ratio":0.62,"achievements":["Achievement 1","Achievement 2"],"score":5005},
	{"name":"Teligin","image":"https://robohash.org/quidictaporro.png?size=200x200&set=set1","coalition":"Assembly","status":"online","games":47,"wins":4,"ratio":0.09,"achievements":["Achievement 1","Achievement 2"],"score":686},
	{"name":"Gutherson","image":"https://robohash.org/providentrerumest.png?size=200x200&set=set1","coalition":"Order","status":"ingame","games":62,"wins":62,"ratio":1.0,"achievements":["Achievement 1","Achievement 2"],"score":6200},
	{"name":"Bundock","image":"https://robohash.org/commodivoluptasnulla.png?size=200x200&set=set1","coalition":"Alliance","status":"ingame","games":8,"wins":2,"ratio":0.25,"achievements":["Achievement 1","Achievement 2"],"score":200},
	{"name":"Tilby","image":"https://robohash.org/molestiaemagnidolore.png?size=200x200&set=set1","coalition":"Order","status":"offline","games":82,"wins":73,"ratio":0.89,"achievements":["Achievement 1","Achievement 2"],"score":7068},
	{"name":"Ilyunin","image":"https://robohash.org/remvoluptatibusoptio.png?size=200x200&set=set1","coalition":"Order","status":"offline","games":35,"wins":19,"ratio":0.54,"achievements":["Achievement 1","Achievement 2"],"score":1709},
	{"name":"Atton","image":"https://robohash.org/voluptaseosplaceat.png?size=200x200&set=set1","coalition":"Assembly","status":"ingame","games":33,"wins":32,"ratio":0.97,"achievements":["Achievement 1","Achievement 2"],"score":3171},
];

const { Search } = Input;

function Social() {
  const [search, setSearch] = useState("");
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
          width: "30%",
        }}
        enterButton
      />
      <F.H3>
        Friends -{" "}
        {friends.filter((friend) => filterByName(friend, search)).length}
      </F.H3>
      <S.UserContainer>
        {friends
          .sort(compareStatus)
          .filter((friend) => filterByName(friend, search))
          .map((friend: IUser) => (
            <Friend friend={friend} key={friend.name} />
          ))}
      </S.UserContainer>
      <Divider style={{ visibility: "hidden" }} />
      <F.H3>
        Blocked -{" "}
        {blocked.filter((blocked) => filterByName(blocked, search)).length}
      </F.H3>
      <S.UserContainer>
        {blocked
          .filter((user) => filterByName(user, search))
          .map((user: IUser) => (
            <Blocked user={user} key={user.name} />
          ))}
      </S.UserContainer>
    </S.Container>
  );
}

export default Social;
