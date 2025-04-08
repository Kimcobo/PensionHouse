window.addEventListener('scroll',()=>{
  const header = document.querySelector('header');
  if( window.scrollY>0 ){
    header.classList.add('fix');
  }else{
    header.classList.remove('fix');
  }
});

const mainMenu = document.querySelectorAll('.gnb>ul>li');

const enterFunc=(e)=>{
  if(e.currentTarget.querySelector('.sub')){
    e.currentTarget.querySelector('.sub').style.display = 'block';
  }
}
const leaveFunc=(e)=>{
  if(e.currentTarget.querySelector('.sub')){
    e.currentTarget.querySelector('.sub').style.display = 'none';
  }
}
const checkWindow=()=>{
  if( window.innerWidth>=1200 ){
    mainMenu.forEach((list)=>{
      list.addEventListener('mouseenter',enterFunc);
      list.addEventListener('mouseleave',leaveFunc);
    })
  }else{
    mainMenu.forEach((list)=>{
      list.removeEventListener('mouseenter',enterFunc);
      list.removeEventListener('mouseleave',leaveFunc);
    })
  }
}
checkWindow();
window.addEventListener('resize', checkWindow);

const toggle = document.querySelector('.toggle');
const gnb = document.querySelector('.gnb');
const bg = document.querySelector('.black_bg');
const gnbClose = document.querySelector('.close');
let toggleState = true;
toggle.addEventListener('click',()=>{
  if( toggleState ){
    gnb.style.left = 0;         
    bg.style.display = 'block';
    bg.style.zIndex = 99998;    
    toggleState = false;
  }else{
    gnb.style.left = '-70vw';
    bg.style.display = 'none';
    toggleState = true;
  }
})
gnbClose.addEventListener('click', ()=>{
  gnb.style.left = '-70vw';
  bg.style.display = 'none';
  toggleState = true;
})

mainMenu.forEach((menu, index)=>{
  if(index>=1){
    menu.querySelector('a').addEventListener('click', (e)=>{
      if( window.innerWidth<1200 ){       
        const sub = e.currentTarget.nextElementSibling;
        if(sub){ 
          e.preventDefault();
          if(sub.style.display=='none' || sub.style.display==''){
            mainMenu.forEach((menu)=>{
              const allSub=menu.querySelector('a').nextElementSibling;
              console.log(allSub);
              if(allSub){
                allSub.style.display="none";
              }
            });
            sub.style.display='block';
          }else{
            sub.style.display='none';
          }
        }
      }
    });
  }
});

const searchForm = document.querySelector('#searchForm');
searchForm.addEventListener('keypress', (event)=>{
  if( event.key==='Enter' ){ 
    event.preventDefault();
    this.submit();
  }
});

const searchOpen = document.querySelector('.icons_top ul li a');
const searchArea = document.querySelector('.search_area');
const searchClose = document.querySelector('.search_area #close');
searchOpen.addEventListener('click', (e)=>{
  e.preventDefault();
  searchArea.style.display = 'flex';
});
searchClose.addEventListener('click', ()=>{
  searchArea.style.display = 'none';
});

const ameni=document.querySelector('#Amenity');
const wrap=ameni.querySelectorAll('.wrapping');
wrap.forEach((rap,index)=>{
  const img=rap.querySelector('img');
  rap.addEventListener('mouseenter',()=>{
    if(index==0){
      img.setAttribute('src','images/svg/valley_hover.png');
    }else if(index==1){
      img.setAttribute('src','images/svg/amenities_hover.png');
    }else{
      img.setAttribute('src','images/svg/service_hover.png');
    }
  });
  rap.addEventListener('mouseleave',()=>{
    if(index==0){
      img.setAttribute('src','images/svg/valley.png');
    }else if(index==1){
      img.setAttribute('src','images/svg/amenities.png');
    }else{
      img.setAttribute('src','images/svg/service.png');
    }
  })
})

document.addEventListener('DOMContentLoaded', function(){

  const animateText=(text, detail)=>{
    const letters=text.textContent.split('');
    text.innerHTML='';
    letters.forEach((letter,index)=>{
      const span = document.createElement('span');
      (letter===" ") ? span.innerHTML='&nbsp;' : span.textContent=letter;
      span.style.display='inline-block';
      text.appendChild(span);
    });
    const spans = text.querySelectorAll('span');
    spans.forEach((span, index)=>{
      gsap.set(span, {
        opacity:0, y:60, display:'inline-block',
      });
      gsap.to(span, {
        duration:0.8, opacity:1, y:0, delay:(index+1)*0.08, ease:'power2.out', overwrite:'auto'
      });
    })
    gsap.set(detail,{
      opacity:0
    });
    gsap.to(detail,{
      duration:0.8, opacity:1, delay:3, ease:'power2.out', overwrite:'auto'
    });
  }

  const swiper=new Swiper('.swiper', {
    autoplay:{
      delay:8000,
    },
    loop:true,
    on:{
      slideChange:function(){
        const prevSlide = this.slides[this.previousIndex].querySelector('.text_content');
        const currentText = this.slides[this.activeIndex].querySelector('.text_content');
        const currentDetail=this.slides[this.activeIndex].querySelector('.sub_detail')
        animateText(currentText, currentDetail);
      }
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  })

  window.onload=()=>{
    const initText = swiper.slides[swiper.activeIndex].querySelector('.text_content');
    animateText(initText);
  }

  const imgWrappers = document.querySelectorAll('.imgs_wrap');
  imgWrappers.forEach((wrapper, index)=>{
    const imgs = wrapper.querySelectorAll('img');
    imgs.forEach((img)=>{
      img.dataset.originWidth = img.offsetWidth;
      img.dataset.originHeight = img.offsetHeight;

      gsap.set( img, {
        opacity:0, y:-150,
        height:img.offsetHeight,  transformOrigin:'left center'
      });
    })

    gsap.to(imgs, {
      opacity:1,
      y:0,
      ease:'sine.out',
      duration:3,
      stagger:3,
      scrollTrigger:{
        trigger:wrapper,
        start:'top 90%',
        end:'top 70%',
        scrub:2,
        toggleActions:'restart pause reverse pause',
      }
    })
  });
  const contents=document.querySelectorAll('.content');
  const tablet=window.matchMedia('(min-width:768px)').matches;
  contents.forEach((content,index)=>{
    if(tablet){
      if(index==1){
        gsap.set(content,{
          opacity:0,
          x:-200
        });
      }else if(index==3){
        gsap.set(content,{
          opacity:0,
          x:-200
        });
      }else{
        gsap.set(content,{
          opacity:0,
          x:200
        });
      }
    }else{
      gsap.set(content,{
        opacity:0,
        x:200
      });
    }
    gsap.to(content,{
      opacity:1,
      x:0,
      ease:'sine.out',
      duration:3,
      scrollTrigger:{
        trigger:content,
        start:'top 90%',
        end:'top 70%',
        scrub:2,
        toggleActions:'restart pause reverse pause',
      }
    });
  });


  const amenities = document.querySelectorAll('#Amenity .content_wrap>div');
  const rows = [];
  amenities.forEach((item, index)=>{
    const rowIndex = Math.floor( index/3 );
    if(!rows[rowIndex]){
      rows[rowIndex] = [];
    }
    rows[rowIndex].push(item);
  })

  const ctw=document.querySelector('.content_wrap');
  rows.forEach((row, rowIndex)=>{
    gsap.from(row, {
      opacity:0,
      y:300,
      duration:1,
      scrollTrigger:{
        trigger:ctw,
        start:'top 70%',
        end:'bottom top',
        toggleActions:'play none none reverse',
        onEnter:()=> gsap.to(row,{ opacity:1, y:0, overwrite:true}),
        onLeaveBack:()=> gsap.to(row,{opacity:1, y:0, overwrite:true})
      }
    })
  })
  
  gsap.fromTo('#news_wrap>div',
    {
      opacity:0,
      x:500
    },{
      opacity:1,
      x:0,
      duration:1,
      stagger:0.5,
      scrollTrigger:{
        trigger:'#news_wrap',
        start:'top 70%',
        toggleAction:'play none none reverse'
      }
    }
  )
});

const Top=document.querySelector('.top');
Top.addEventListener('click',(e)=>{
  e.preventDefault();
  window.scrollTo({
    top:0,
    left:0,
    behavior:"smooth"
  });
});
window.addEventListener('scroll',(e)=>{
  if(window.scrollY>50){
    Top.style.right='3%';
  }else{
    Top.style.right='-10%';
  }
});