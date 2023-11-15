export default async function handler(req, res) {
  try {
    const myHeaders = new Headers()
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

    const requestOptions = {
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
      // const avoidCategories = ["It's All Goodies", 'Featured Drinks']
      splitArray.forEach((arr, index) => {
        let formated = addBracketsIfNEeded(arr, index, splitArray.length)
        let formatedJson = JSON.parse(formated)
        if (formatedJson.category == 'Featured Drinks' || formatedJson.category == 'Seasonal Drinks') {
          objectArray.push(JSON.parse(formated))
        }
        // return if not in avoid categories
        // if (!avoidCategories.includes(formatedJson.category)) {
        //   objectArray.push(JSON.parse(formated))
        // }
      })
      objectArray = removeDuplicates(objectArray)
      return res
        .status(200)
        .json({ drinks: objectArray, count: objectArray.length })
    } else {
      res.status(404).json({ error: 'No data found', drinks: [] })
    }
  } catch (error) {
    console.log({ error })
    res
      .status(500)
      .json({ message: 'Internal server error', error, drinks: [] })
  }
}
//

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

const removeDuplicates = (arr) => {
  // {
  //   "name": "Annihilator",
  //   "slug": "annihilator",
  //   "trademarked": true,
  //   "available_sugar_free": false,
  //   "description": "Chocolate Macadamia Nut Breve",
  //   "long_description": "Feeling nutty? Maybe chocolatey? The Annihilator® breve perfectly blends strong espresso, half and half and chocolate macadamia nut syrup to satisfy your cravings.  Available hot, iced or blended!",
  //   "image": "512px2/Iced_Annihilator_HERO.png",
  //   "sort": 3,
  //   "full_slug": "dutch-classics/annihilator",
  //   "category": "Dutch Classics",
  //   "pdp": 1
  // },

  // dont return the same name twice
  const unique = arr
    .map((e) => e.name)
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter((e) => arr[e])
    .map((e) => arr[e])

  return unique
}
