
export default async (req, res) => {
  if (req.method === 'GET') {
            var myHeaders = new Headers();
            myHeaders.append("authority", "www.dutchbros.com");
            myHeaders.append("accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9");
            myHeaders.append("accept-language", "en-US,en;q=0.9");
            myHeaders.append("sec-ch-ua", "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"100\", \"Google Chrome\";v=\"100\"");
            myHeaders.append("sec-ch-ua-mobile", "?0");
            myHeaders.append("sec-ch-ua-platform", "\"macOS\"");
            myHeaders.append("sec-fetch-dest", "document");
            myHeaders.append("sec-fetch-mode", "navigate");
            myHeaders.append("sec-fetch-site", "cross-site");

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            const resp = await fetch(`https://www.dutchbros.com/menu`, requestOptions)
  
            if (resp) {
                let res_text = await resp.text()

                var result = res_text.match(/({"name":(.*)"pdp")/gs)

               let splitArray = result[0].split("},{")

               let objectArray = []
                splitArray.forEach((arr, index) => {
                    let formated = addBracketsIfNEeded(arr, index, splitArray.length)
                    objectArray.push(JSON.parse(formated))
                })

                return res.status(200).json({ objectArray })
                    }
              }
          }               
    

function addBracketsIfNEeded(string, curentIndex, totalArrayLength){
    if (string?.length > 1) {
        let firstChar  = string[0]
        let lastChar = string[string.length - 1]
        let editableString = string

        if (firstChar != "{") {
            editableString = "{" + editableString
        }
        if (curentIndex == totalArrayLength - 1) {
            editableString = editableString  + ':1' 
        }
        if (lastChar != "}") {
            editableString = editableString  + '}'
        }
        
        return editableString
    }
   return string
}