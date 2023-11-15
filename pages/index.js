import CategoryCard from '../components/CategoryCard'
import RandomizeButton from '../components/RandomizeButton'
import SelectedDrink from '../components/SelectedDrink'
import { useState, useEffect } from 'react'
import Header from '../components/Header'

function addBracketsIfNEeded(string, currentIndex, totalArrayLength) {
  if (string?.length > 1) {
    let firstChar = string[0]
    let lastChar = string[string.length - 1]
    let editableString = string

    if (firstChar != '{') {
      editableString = '{' + editableString
    }
    if (currentIndex == totalArrayLength - 1) {
      editableString = editableString + ':1'
    }
    if (lastChar != '}') {
      editableString = editableString + '}'
    }
    return editableString
  }
  return string
}

export async function getServerSideProps() {
  var myHeaders = new Headers()
  myHeaders.append('authority', 'www.dutchbros.com')
  myHeaders.append(
    'accept',
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
  )
  myHeaders.append('accept-language', 'en-US,en;q=0.9')
  myHeaders.append(
    'sec-ch-ua',
    '" Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"'
  )
  myHeaders.append('sec-ch-ua-mobile', '?0')
  myHeaders.append('sec-ch-ua-platform', '"macOS"')
  myHeaders.append('sec-fetch-dest', 'document')
  myHeaders.append('sec-fetch-mode', 'navigate')
  myHeaders.append('sec-fetch-site', 'cross-site')

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  }

  const resp = await fetch(`https://www.dutchbros.com/menu`, requestOptions)

  if (resp) {
    let res_text = await resp.text()
    var result = res_text.match(/({"name":(.*)"pdp")/gs)
    let splitArray = result[0].split('},{')
    let objectArray = []
    splitArray.forEach((arr, index) => {
      let formated = addBracketsIfNEeded(arr, index, splitArray.length)
      let formatedJson = JSON.parse(formated)
      if (formatedJson.category != "It's All Goodies") {
        objectArray.push(JSON.parse(formated))
      }
    })
    return {
      props: { objectArray },
    }
  }
}

const cards = [
  {
    category: 'Seasonal Drinks',
    description: 'Seasonal',
    image: '/images/Featured.png',
  },
  {
    category: 'Featured Drinks',
    description: 'Featured',
    image: '/images/Featured.png',
  },
  {
    category: 'Dutch Classics',
    description: 'Our favorites, guaranteed to satisfy',
    image: '/images/Classics.png',
  },
  {
    category: 'Cold Brew',
    description:
      'Cold Brew to fuel your day.  Also available Nitro-infused if you need an extra kick.',
    image: '/images/Coldbrew.png',
  },
  {
    category: 'Dutch Freeze',
    description: 'Blended coffee perfection, paired with your favorite flavor.',
    image: '/images/Dutchfreeze.png',
  },
  {
    category: 'Americano',
    description:
      'Hand-pulled espresso shots of our dutch bros private reserve coffee blend.',
    image: '/images/Americano.png',
  },
  {
    category: 'Dutch Bros Rebel Energy Drink',
    description:
      'An energy drink created by dutch bros, customized by you. Also available in sugar free!',
    image: '/images/Rebel.png',
  },
  {
    category: 'Dutch Frost',
    description: 'A dutch take on a classic shake.',
    image: '/images/Dutchfrost.png',
  },
  {
    category: 'Tea',
    description:
      'High-quality organic green or paris black tea infused with any flavor.',
    image: '/images/Tea.png',
  },
  {
    category: 'Kids',
    description:
      'Crafted for the kiddos - dutch frosts, smoothies, sodas and not-so-hots.',
    image: '/images/Kids.png',
  },
  {
    category: 'Smoothie',
    description: 'Our fruit smoothie crafted in your favorite flavors.',
    image: '/images/Smoothie.png',
  },
  {
    category: 'Lemonade',
    description: 'A sweet and tart way to refresh your day.',
    image: '/images/Lemonade.png',
  },
  {
    category: 'Dutch Soda',
    description:
      'Sparkling soda water infused with your favorite flavor combo.',
    image: '/images/Dutchsoda.png',
  },
  {
    category: 'Chai',
    description: 'Chai it your way! Try it hot or iced!',
    image: '/images/Chai.png',
  },
  {
    category: 'Dutch Cocoa',
    description:
      'Our exclusive chocolate milk, steamed to perfection with a flavor of your choice.',
    image: '/images/Dutchcocoa.png',
  },
]

const Home = ({ objectArray }) => {
  console.log({objectArray})
  const [randomize, setRandomize] = useState(false)
  const [randomResult, setRandomResult] = useState(getRandomDrink(objectArray))
  const [wayBackVisible, setWayBackVisible] = useState(true)
  const [newestImageVisible, setNewestImageVisible] = useState(true)
  const [imageLoading, setImageLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [buttonText, setButtonText] = useState('Randomize')

  useEffect(() => {
    setRandomResult(getRandomDrink(objectArray, selectedCategory))
  }, [randomize])

  useEffect(() => {
    setButtonText(
      `${
        selectedCategory?.length > 0
          ? 'Random ' +
            selectedCategory.replace('Dutch Bros Rebel Energy', 'Rebel')
          : 'Randomize'
      }`
    )
  }, [selectedCategory])

  function getRandomDrink(allDrinks, category = null) {
    let randomNum = randomIntFromInterval(0, allDrinks.length)
    let randomDrink = allDrinks[randomNum]

    if (category == null) {
      //no category given, choose random without category
      return randomDrink
    } else {
      while (randomDrink?.category != category) {
        randomNum = randomIntFromInterval(0, allDrinks.length)
        randomDrink = allDrinks[randomNum]
      }
      return randomDrink
    }
  }

  function randomIntFromInterval(min, max) {
    // min and max included
    let randomNumber = Math.floor(Math.random() * (max - min + 1) + min)
    return randomNumber
  }

  return (
    <>
      <div className="sticky top-0 z-50">
        <Header />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="py-10">
            <div className="">
              <SelectedDrink
                drink={randomResult}
                wayBackVisible={wayBackVisible}
                setWayBackVisible={setWayBackVisible}
                newestImageVisible={newestImageVisible}
                setNewestImageVisible={setNewestImageVisible}
                imageLoading={imageLoading}
                setImageLoading={setImageLoading}
              />
            </div>

            <div className="">
              <RandomizeButton
                randomize={randomize}
                setRandomize={setRandomize}
                setWayBackVisible={setWayBackVisible}
                setNewestImageVisible={setNewestImageVisible}
                setImageLoading={setImageLoading}
                selectedCategory={selectedCategory}
                buttonText={buttonText}
              />
            </div>

            {cards.map((card, index) => {
              return (
                <CategoryCard
                  key={index}
                  index={index}
                  category={card.category}
                  description={card.description}
                  image={card.image}
                  setSelectedCategory={setSelectedCategory}
                  selectedCategory={selectedCategory}
                />
              )
            })}
          </div>
        </div>

        {/* BG Icons */}
        <div className="absolute left-1 top-[60vh] -z-[1] h-5 w-5">
          <img src="/images/windmill.png" alt="" />
        </div>
        <div className="absolute left-1 top-[80vh] -z-[1] h-5 w-5">
          <img src="/images/bean.png" alt="" />
        </div>
        <div className="absolute right-1 top-[70vh] -z-[1] h-5 w-5">
          <img src="/images/beans.png" alt="" />
        </div>
        <div className="absolute right-1 top-[90vh] -z-[1] h-5 w-5">
          <img src="/images/windmill.png" alt="" />
        </div>
      </div>
    </>
  )
}

export default Home

// Drink object
// {
//   "name": "9-1-1",
//   "slug": "911",
//   "trademarked": true,
//   "available_sugar_free": false,
//   "description": "6-Shot Irish Cream Breve",
//   "long_description": "The 9-1-1 packs six shots of espresso, half and half and Irish cream syrup into one strong, energy-packed drink! Ready for you to enjoy hot, iced, or blended!",
//   "image": "512px2/Iced_911_HERO.png",
//   "sort": 6,
//   "full_slug": "dutch-classics/911",
//   "category": "Dutch Classics",
//   "pdp": 1
// }
