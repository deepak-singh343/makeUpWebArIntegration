import {MessageService} from './messageService.js';
const virtualTryOnImagePath='https://da4e1j5r7gw87.cloudfront.net/wp-content/uploads/sites/2872/2020/09/Virtual-Try-On_Thumbnail.jpg'
const lipstick={
    category:"lipstick",
    sku: "lipstick1",
    name: "Oh so creamy pinks! ",
    type: "color",
    feature: "lipstick",
    finish: "satin",
    description: "Bold & Beautiful",
    image: "/productImages/Lipstick1.webp",
    items: [
      {
        color: {
          r: 171,
          g: 74,
          b: 67,
          a: 0.75,
        },
      },
      {
        color: {
          r: 174,
          g: 16,
          b: 40,
          a: 0.75,
        },
      },
      {
        color: "#fc9c9c",
      },
    ],
    selectedItem:{
        color: "#991824"
    }
}

function addMakeUpWebAR(){
    const iframe=document.getElementById('beautify-iframe')
    iframe.onload=function(){
        addEventListenerToColorPaletteColors();
        MessageService.setIframe(iframe);
        MessageService.sendMessageToRendererOnProductChange(lipstick);
    }
}
addMakeUpWebAR()

function createIframeAndSetProperties(parentElement){
    const iframe=document.createElement('iframe');

    iframe.id='beautify-iframe';
    iframe.classList.add('beautify-iframe');
    iframe.height=parentElement.clientHeight;
    iframe.width=parentElement.clientWidth;
    iframe.allow="camera;autoplay;microphone;clipboard-read; clipboard-write";
    
    let style=`
        position:absolute;
        top:0px;
        z-index:10000;
    `
    iframe.style.cssText=style;
    return iframe;
}

function addEventListenerToColorPaletteColors(){
    const colorVariants=document.querySelectorAll('[data-js-option-value]');
    if(colorVariants){
        for(let colorVariant of colorVariants){
            colorVariant.onclick=handleColorVariantChange;
        }
    }
}

function handleColorVariantChange(event){
    const style=window.getComputedStyle(event.currentTarget);
    const backgroundColor=style.getPropertyValue('background-color');
    const hexValue=rgbToHex(backgroundColor);
    lipstick.selectedItem.color=hexValue;
    MessageService.sendMessageToRendererOnProductChange(lipstick);
}

function rgbToHex(rgb) {
    if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;
  
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

    return "#" + hexCode(rgb[1]) + hexCode(rgb[2]) + hexCode(rgb[3]);
}

function hexCode(i) {
    return ("0" + parseInt(i).toString(16)).slice(-2);
}

