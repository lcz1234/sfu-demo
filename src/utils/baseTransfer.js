let keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
export const encodeFuc = (input) => {
  let output = "", chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0
  input = utf8_encode(input)
  while (i < input.length) {
    chr1 = input.charCodeAt(i++)
    chr2 = input.charCodeAt(i++)
    chr3 = input.charCodeAt(i++)
    enc1 = chr1 >> 2
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
    enc4 = chr3 & 63
    if (isNaN(chr2)) {
      enc3 = enc4 = 64
    } else if (isNaN(chr3)) {
      enc4 = 64
    }
    output = output +
      keyStr.charAt(enc1) + keyStr.charAt(enc2) +
      keyStr.charAt(enc3) + keyStr.charAt(enc4)
  }
  return output
}
const utf8_encode = (string) => {
  string = string.toString().replace(/\r\n/g, "\n")
  let utftext = ""
  for (let n = 0; n < string.length; n++) {
    let c = string.charCodeAt(n)
    if (c < 128) {
      utftext += String.fromCharCode(c)
    } else if ((c > 127) && (c < 2048)) {
      utftext += String.fromCharCode((c >> 6) | 192)
      utftext += String.fromCharCode((c & 63) | 128)
    } else {
      utftext += String.fromCharCode((c >> 12) | 224)
      utftext += String.fromCharCode(((c >> 6) & 63) | 128)
      utftext += String.fromCharCode((c & 63) | 128)
    }

  }
  return utftext
}

// 编码
const newBase = encodeFuc(JSON.stringify({ type: "xxx", id: "xxx" }))

export const decodeFuc = (input) => {
  let output = "", chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "")
  while (i < input.length) {
    enc1 = keyStr.indexOf(input.charAt(i++))
    enc2 = keyStr.indexOf(input.charAt(i++))
    enc3 = keyStr.indexOf(input.charAt(i++))
    enc4 = keyStr.indexOf(input.charAt(i++))
    chr1 = (enc1 << 2) | (enc2 >> 4)
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
    chr3 = ((enc3 & 3) << 6) | enc4
    output = output + String.fromCharCode(chr1)
    if (enc3 != 64) {
      output = output + String.fromCharCode(chr2)
    }
    if (enc4 != 64) {
      output = output + String.fromCharCode(chr3)
    }
  }
  output = utf8_decode(output)
  return output
}

const utf8_decode = (utftext) => {
  let string = "", i = 0, c = 0, c1 = 0, c2 = 0, c3 = 0
  while (i < utftext.length) {
    c = utftext.charCodeAt(i)
    if (c < 128) {
      string += String.fromCharCode(c)
      i++
    } else if ((c > 191) && (c < 224)) {
      c2 = utftext.charCodeAt(i + 1)
      string += String.fromCharCode(((c & 31) << 6) | (c2 & 63))
      i += 2
    } else {
      c2 = utftext.charCodeAt(i + 1)
      c3 = utftext.charCodeAt(i + 2)
      string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63))
      i += 3
    }
  }
  return string
}
// 解码
const oldValue = JSON.parse(decodeFuc(newBase))

export function replacer (key, value) {
  // if (value instanceof LocalParticipant) {
  //   console.log('key11', key, 'value22', value)
  //   return {
  //     dataType: 'LocalParticipant',
  //     value: Object.assign(value), // or with spread: value: [...value]
  //   }
  // }
  if (value instanceof Map) {
    return {
      dataType: 'Map',
      value: Array.from(value.entries()), // or with spread: value: [...value]
    }
  } else {
    return value
  }
}

export function reviver (key, value) {
  if (typeof value === 'object' && value !== null) {
    if (value.dataType === 'Map') {
      return new Map(value.value)
    }
    // if (value.dataType === 'LocalParticipant') {
    //   console.log('value.value', value.value)
    //   return new LocalParticipant(value.value)
    // }
  }
  return value
}

function strMapToObj (strMap) {
  let obj = Object.create(null)
  for (let [k, v] of strMap) {
    // We don’t escape the key '__proto__'
    // which can cause problems on older engines
    obj[k] = v
  }
  return obj
}

function objToStrMap (obj) {
  let strMap = new Map()
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k])
  }
  return strMap
}


// export function serialize (obj, name) {
//   var result = ""
//   function serializeInternal (o, path) {
//     for (p in o) {
//       var value = o[p]
//       if (typeof value != "object") {
//         if (typeof value == "string") {
//           result += "\n" + path + "[" + (isNaN(p) ? "\"" + p + "\"" : p) + "] = " + "\"" + value.replace(/\"/g, "\\\"") + "\"" + ";"
//         } else {
//           result += "\n" + path + "[" + (isNaN(p) ? "\"" + p + "\"" : p) + "] = " + value + ";"
//         }
//       }
//       else {
//         if (Array.isArray(value)) {
//           result += "\n" + path + "[" + (isNaN(p) ? "\"" + p + "\"" : p) + "]" + "=" + "new Array();"
//           serializeInternal(value, path + "[" + (isNaN(p) ? "\"" + p + "\"" : p) + "]")
//         } else {
//           result += "\n" + path + "[" + (isNaN(p) ? "\"" + p + "\"" : p) + "]" + "=" + "new Object();"
//           serializeInternal(value, path + "[" + (isNaN(p) ? "\"" + p + "\"" : p) + "]")
//         }
//       }
//     }
//   }
//   serializeInternal(obj, name)
//   return result
// }
