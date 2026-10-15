const soundEffect = document.getElementById("sparkle");

async function getCardData() {
   const response = await fetch("cards.json");
   const data = await response.json();
   console.log(data);
   const cardData = data.cards;

   const cardContainer = document.getElementById("card-container");
   for (let i = 0; i < cardData.length; i++) {
      const card = new Card(
         cardData[i].name,
         cardData[i].id,
         cardData[i].img,
         cardData[i].rarity,
      );
      cardContainer.appendChild(card.cardElement);
   }
}
getCardData();

class Card {
   constructor(name, id, img, rarity) {
      this.name = name;
      this.id = id;
      this.img = img;
      this.rarity = rarity;

      this.cardElement = document.createElement("div");
      this.cardElement.classList.add("card");

      this.nameElement = document.createElement("p");
      this.nameElement.textContent = this.name;
      this.nameElement.style.fontWeight = "bold";

      this.rarityElement = document.createElement("p");
      this.rarityElement.textContent = this.rarity;

      this.imageElement = document.createElement("img");
      this.imageElement.src = this.img;

      this.cardElement.appendChild(this.imageElement);
      this.cardElement.appendChild(this.nameElement);
      this.cardElement.appendChild(this.rarityElement);

      const that = this;
      this.onClick = function () {
         that.sparkle();
      };
      this.cardElement.addEventListener("click", this.onClick);
   }

   sparkle() {
      this.cardElement.style["boxShadow"] = "0px 0px 40px 15px rgb(255, 244, 40)";
      soundEffect.play();

      setTimeout(() => {
         this.cardElement.style["boxShadow"] = "none";
      }, 1000);
   }
}
