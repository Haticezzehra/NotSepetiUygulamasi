const yeniGorev = document.querySelector('.input-gorev');
const yeniGorevEkleBtn = document.querySelector('.btn-gorev-ekle');
const gorevListesi = document.querySelector('.gorev-listesi');
document.addEventListener('DOMContentLoaded',localStoragedenoku);
yeniGorevEkleBtn.addEventListener(
    "click",
    function(e) {
        e.preventDefault(); 
     if(yeniGorev.value.length>0){
        gorevItemOlustur(yeniGorev.value)
        localStorageKaydet(yeniGorev.value);
     }
     else{
        alert("Gorev tanımını boş girdiniz.");
     }
        yeniGorev.value=' ';

    }

   
);

gorevListesi.addEventListener('click',gorevSilTamamla)
{
    
}
function gorevSilTamamla(e)
{
 const tiklananEleman= e.target;
 if(tiklananEleman.classList.contains('gorev-tamamlandı'))
 {
    console.log("Checked Tıklandı.");
    tiklananEleman.parentElement.classList.toggle('gorev-tamamlandi')
 }
 if(tiklananEleman.classList.contains('gorev-sil'))
 { 
    if(confirm('Silmek istediğinizden emin misiniz?')){
    tiklananEleman.parentElement.classList.toggle('kaybol'); 
    const silinecekGorev=tiklananEleman.parentElement.children[0].innerText;
    localStorageSil(silinecekGorev);  
    
    tiklananEleman.parentElement.addEventListener('transitionend',function(){
        tiklananEleman.parentElement.remove();  
    })   ;   
}
 }  
}
function localStorageArayaDonustur()
{
    let gorevler;
    if(localStorage.getItem('gorevler')===null)
    {
        gorevler=[];
    }
    else{
        gorevler=JSON.parse(localStorage.getItem('gorevler'));
    }

    return gorevler;
}

function localStorageKaydet(yeniGorev)
{
    let gorevler=localStorageArayaDonustur() ;
    
    gorevler.push(yeniGorev);
    localStorage.setItem('gorevler',JSON.stringify(gorevler));
}

function localStoragedenoku()
{
    let gorevler=localStorageArayaDonustur();
   gorevler.forEach(function(gorev)
   {
    gorevItemOlustur(gorev)

   });

}

function gorevItemOlustur(gorev)
{
    //div oluşturma
    const gorevDiv=document.createElement('div');
    gorevDiv.classList.add('gorev-item');
    //li olusturma
    const gorevLi=document.createElement('li'); 
    gorevLi.classList.add('gorev-tanim');    
    gorevLi.innerText=gorev;
    gorevDiv.appendChild(gorevLi);
    //ul ye oluşturduğumuz divi ekleyelim
    
    ////////
    
   const gorevTamam=document.createElement('button');
    gorevTamam.classList.add('gorev-btn');
    gorevTamam.classList.add('gorev-tamamlandı');
    
    gorevTamam.innerHTML='<i class="fa fa-check-square"></i>'
    gorevDiv.appendChild(gorevTamam);
    ///// */
    
    const gorevSil=document.createElement('button');
    gorevSil.classList.add('gorev-sil');
    gorevSil.classList.add('gorev-btn');
    gorevSil.innerHTML='<i class="far fa-trash-alt"></i>'
    gorevDiv.appendChild(gorevSil);
      
    gorevListesi.appendChild(gorevDiv);
  
}
function localStorageSil()
{
    let gorevler=localStorageArayaDonustur();
    const silinecekElemanIndex=gorevler.indexOf(gorev);
    console.log(silinecekElemanIndex);
    gorevler.splice(silinecekElemanIndex,1);
    localStorage.setItem('gorevler',JSON.stringify(gorevler));



}
