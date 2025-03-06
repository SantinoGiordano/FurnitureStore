"use client";
import React from "react";
interface Furniture {
  favorite: boolean;
}
function changeHeart(item:Furniture){
  if(item.favorite == false){
    item.favorite = true
    console.log("false >>> true")
    // return <div>{ "❤️" }</div>
  }
  if(item.favorite == true){
    item.favorite = false
    console.log("true >>> false")
  }
}

const Hearts = ({ favorite }: { favorite: boolean }) => {
  return <div>{favorite ? "❤️" : "🤍"}</div>;
};

const FavoriteSystem = ({ item }: { item: Furniture }) => {
  return(
  <div onClick={()=>changeHeart(item)} className="hover:cursor-pointer">
    <Hearts favorite={item.favorite} />
  </div>
  ) 
  
};
export default FavoriteSystem;
