const container = document.getElementById(`container`);
const row = document.getElementById(`row`);
const ol = document.getElementById(`ol`);
const olPrice = document.getElementById(`olPrice`);
let tot = 0;
const total = document.getElementById(`tot`);

fetch(`https://striveschool-api.herokuapp.com/books`)
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      if (res.status === 404) {
        throw new Error("404 - Not Found");
      } else if (res.status === 500) {
        throw new Error("500 - Internal Server Error");
      } else {
        throw new Error("Errore generico");
      }
    }
  })
  .then((library) => {
    for (i = 0; i < 60; i++) {
      //   console.log("library", library);
      const col = document.createElement(`div`);
      col.classList.add(`col-12`);
      col.classList.add(`col-sm-6`);
      col.classList.add(`col-lg-4`);
      col.classList.add(`col-xl-3`);

      const card = document.createElement(`div`);
      card.classList.add(`card`);
      card.classList.add(`card1`);
      card.classList.add(`align-items-center`);
      //   card.classList.add(`position-relative`);

      let img = new Image();
      img.classList.add(`card-img-top`);
      img.classList.add(`w-100`);
      //   card.style.height = `580px`;
      //   img.setAttribute("height", `450px`);
      img.src = library[i].img;
      //   console.log(library[i].img);
      //   console.log(img.src);
      let title = document.createElement(`h5`);
      title.classList.add(`card-title`);
      title.classList.add(`mt-3`);
      title.classList.add(`ms-3`);
      title.innerText = library[i].title;
      let priceContainer = document.createElement(`div`);
      //   priceContainer.classList.add(`position-absolute`);
      //   priceContainer.classList.add(`bottom-0`);
      //   priceContainer.classList.add(`end-0`);
      //   priceContainer.classList.add(`align-items-end`);
      priceContainer.classList.add(`mb-3`);
      //   priceContainer.classList.add(`me-3`);
      //   priceContainer.classList.add(`me-3`);
      priceContainer.classList.add(`d-flex`);
      priceContainer.classList.add(`justify-content-between`);
      priceContainer.classList.add(`align-items-end`);
      priceContainer.classList.add(`flex-grow-1`);
      priceContainer.classList.add(`w-90`);
      let price = document.createElement(`p`);
      price.classList.add(`card-text`);
      price.classList.add(`fw-bold`);
      price.classList.add(`mb-0`);
      price.innerText = `$${library[i].price}`;
      const discard = document.createElement(`button`);
      discard.type = `button`;
      discard.classList.add(`btn`);
      discard.classList.add(`btn-primary`);
      discard.classList.add(`button1`);
      discard.innerText = `Delete`;
      discard.addEventListener(`click`, function (event) {
        // event.card.classList.add(`none`);
        this.parentElement.parentElement.remove();
      });

      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(priceContainer);
      col.appendChild(card);
      row.appendChild(col);

      const addToChart = document.createElement(`button`);
      addToChart.classList.add(`btn`);
      addToChart.classList.add(`btn-primary`);
      addToChart.classList.add(`button2`);
      addToChart.innerText = `Add Chart`;
      priceContainer.appendChild(discard);
      priceContainer.appendChild(addToChart);
      priceContainer.appendChild(price);

      addToChart.addEventListener(`click`, function (event) {
        const li = document.createElement(`li`);
        const liPrice = document.createElement(`li`);

        // console.log(this.parentElement.parentElement.children[1].innerText);
        // li.innerText = this.parentElement.parentElement.children[1].innerText;
        liPrice.innerText =
          this.parentElement.children[2].innerText +
          ` ` +
          this.parentElement.parentElement.children[1].innerText;
        // ol.appendChild(li);
        olPrice.appendChild(liPrice);

        tot = tot + parseFloat(liPrice.innerText.slice(1));
        console.log(tot);
        total.innerText = `total chart ${tot.toFixed(2)}`;
        const deleteButton = document.createElement(`button`);
        deleteButton.classList.add(`mx-2`);
        // deleteButton.classList.add(`d-inline`);
        deleteButton.innerText = `remove from chart`;

        deleteButton.addEventListener(`click`, function (event) {
          //   console.log(this.parentElement.children[0]);
          //   console.log(this.parentElement.parentElement.children[0].firstChild);
          //   this.parentElement.remove();
          this.parentElement.remove();
          this.remove();
          //   console.log(`tot is` + tot);
          tot = tot - parseFloat(liPrice.innerText.slice(1));
          //   console.log(`tot is` + tot);

          console.log(`tot is` + tot.toFixed(2));
          console.log(`togli` + parseFloat(liPrice.innerText.slice(1)));
          if (tot < 0) {
            tot = 0
            total.innerText = `total chart ${tot.toFixed(2)}`;;
          } else {
            total.innerText = `total chart ${tot.toFixed(2)}`;
          }
        });

        liPrice.appendChild(deleteButton);
      });
      total.innerText = `total chart ${tot.toFixed(2)}`;
    }
  });
