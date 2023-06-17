const form = document.querySelector('#searchForm');
const imgContainer = document.querySelector('#showImg');
// imgContainer.style.backgroundColor = 'lightgrey';
imgContainer.style.fontFamily = '"Lucida Console", "Courier New", monospace';
imgContainer.style.display = 'grid';
imgContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
imgContainer.style.gap = '20px';

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const searchTerm = form.elements.query.value;
  const config = { params: { q: searchTerm } };
  const res = await axios.get('http://api.tvmaze.com/search/shows', config);
  console.log(res.data);
  addImages(res.data);
  form.elements.query.value = '';
});

const addImages = (result) => {
  const newdiv = document.createElement('div');
  newdiv.style.backgroundColor = 'white';
  newdiv.style.padding = '10px';
  newdiv.style.display = 'flex';
  newdiv.style.flexDirection = 'column';
  newdiv.style.alignItems = 'center';

  const img = document.createElement('img');
  const p1 = document.createElement('p');
  p1.innerText = result[0].show.name;
  const li = document.createElement('ul');
const r=document.createElement('p');
const averageRating = result[0].show.rating.average;
console.log(averageRating);
r.innerText=`Average rating:${averageRating}`
  var g = result[0].show.genres;
  for (let i = 0; i < g.length; i++) {
    var item = document.createElement('li');
    item.innerText = g[i];
    li.append(item);
  }

  img.src = result[0].show.image.medium;
  img.style.padding = '10px';
  img.style.maxWidth = '100%';

  newdiv.append(img);
  newdiv.append(p1);
  newdiv.append(li);
  newdiv.append(r);

  imgContainer.append(newdiv);
};

function removeImages() {
  imgContainer.innerHTML = '';
}
