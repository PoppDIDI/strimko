function _$(x){
    return document.getElementById(x)
}

function _createElts(x){
    return document.createElement(x)
}

//aminzay tsy afaka ovana le valeur par defaut
function _disableButton(x,i){
    x.value = i;
    x.disabled = true;
}

//creation matrice
let tab = new Array();
function _matrice(){     
    tab[0] = new Array();
    tab[0][0] = "";
    tab[0][1] = "";
    tab[0][2] =4;
    tab[0][3] = "";

    tab[1] = new Array();
    tab[1][0] = "";
    tab[1][1] = 1;
    tab[1][2] = "";
    tab[1][3] = "";

    tab[2] = new Array();
    tab[2][0] = "";
    tab[2][1] = 2;
    tab[2][2] = "";
    tab[2][3] = "";

    tab[3] = new Array();
    tab[3][0] = "";
    tab[3][1] = "";
    tab[3][2] = 3;
    tab[3][3] = "";
    return tab;
}

//teste complet daholo ve ny cage
function caseComplet(){
    let test = 12;
    let non = 1;
    for(i = 0; i < 4; i++){
        for(j=0;j<4;j++){
            if(tab[i][j] == ""){
                test -= 1;
            }
        }
    }
    if(test != 12){
        alert("aza asina banga");
        return non;
    }
}

//popup vrai
function popUpVrai(){
    return img1.style.visibility = "visible";
}

//popup faux
function popUpFaux(){
    return img2.style.visibility = "visible";
}

//popup close
function popUpCroix(){
    return img3.style.visibility = "visible";
}

//popup fermeture
function popUpClose(){
    img1.style.visibility = "hidden";
    img2.style.visibility = "hidden";
    img3.style.visibility = "hidden";
}

window.addEventListener('load', (e)=>{
    e.preventDefault();

    let table = _$('block');
    let ul = _$('choix');
    let form = _$('form');
    let btn; //bouton_à_remplir 
    let canvas = _$('myCanvas') ;//tracage ligne
    let b; //bouton_à_choisir
    let img1 = _$("img1");
    let img2 = _$("img2"); 
    let img3 = _$("img3");  

    _matrice();//initialisation matrice

    //mamorona cage input sy bouton
    for(let i = 0 ; i < 4; i++){

        let tr = _createElts('tr'); 
        table.appendChild(tr);

        for (let j = 0; j < 4; j++) {

            let td= _createElts('td');
            tr.appendChild(td);
            
            btn=_createElts('input');
            btn.id = "L"+i+"_C"+j;
            btn.type="button";
            td.appendChild(btn);  
        }

        let li = _createElts('li');
        ul.appendChild(li); 

        b=_createElts('button');
        b.id = "l"+i;
        li.appendChild(b);

        b.innerHTML = i+1;
    }

    //tracage ligne
    function _drawLine(x,y,z,w){
        let a = canvas.getContext("2d");
        a.moveTo(x,y);
        a.lineTo(z,w);
        a.stroke();
        return a;
    }

    //couleur marron
    _drawLine(50,13,100,13);
    _drawLine(250,55,200,55);
    _drawLine(131,13,167,57);
     //couleur gris
    _drawLine(250,13,200,13);
    _drawLine(50,55,100,55);
    _drawLine(164,14,131,55);
    //couleur beige
    _drawLine(50,95,100,95);
    _drawLine(250,135,200,135);
    _drawLine(130,95,164,135);
    //couleur jaune moutarde
    _drawLine(250,95,200,95);
    _drawLine(50,135,100,135);
    _drawLine(168,92,131,135);

    //amzay tsy afaka ovana ny valeur le efa nomena volohany
    _disableButton(_$('L1_C1'),1);
    _disableButton(_$('L2_C1'),2);
    _disableButton(_$('L3_C2'),3);
    _disableButton(_$('L0_C2'),4);

    //maka valeur avy amin btn choix ho amin btn a remplir
    table.addEventListener('click',function(e){

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                _$('L'+i+'_C'+j).addEventListener('click', function(e){                    
                    ul.style.visibility ="visible";
                    for (let k = 0; k < 4; k++) {
                        _$('l'+k).addEventListener('click', function(e){ 
                            ul.style.visibility ="hidden";
                            _$('L'+i+'_C'+j).value = _$('l'+k).innerHTML;
                            tab[i][j] = _$('l'+k).innerHTML;
                            j = 5;
                        });  
                    }
                });      
            }
        }
    });

    //apres confirmation reponse
    form.addEventListener('submit',(e)=>{
        e.preventDefault();

        let n = caseComplet();
        if(n != 1){

            //verification valiny 
            if ( ((tab[0][0] == 1) && (tab[0][1] == 3) &&
            (tab[1][2] == 2) && (tab[1][3] == 4)) &&

            ((tab[1][0] == 3) && (tab[1][1] == 1) &&
            (tab[0][2] == 4) && (tab[0][3] == 2)) &&

            ((tab[2][0] == 4) && (tab[2][1] == 2) &&
            (tab[3][2] == 3) && (tab[3][3] == 1)) &&

            ((tab[3][0] == 2) && (tab[3][1] == 4) &&
            (tab[2][2] == 1) && (tab[2][3] == 3)) ) {
                
                popUpVrai();
                popUpCroix();

            } else {
                popUpFaux();
                popUpCroix();
            }
        };
    }); 

    //depart a 0
    form.addEventListener('reset',(e)=>{
        e.preventDefault();
        _matrice();
        
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if ( (i!=0 || j!=2) && (i!=1 || j!=1) &&
                     (i!=2 || j!=1) && (i!=3 || j!=2) ){

                     _$('L'+i+'_C'+j).value = "";
                }
            }     
        }
    });
});