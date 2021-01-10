const fs = require('fs')
const path = require('path')

class NamesNodel {
  constructor(name, ip) {
    this.name = name
    this.ip = ip
    this.save()
  }

  toJSON() {
    return {
      name: this.name,
      ip: this.ip,
    }
  }

  async save() {
    const names = await NamesNodel.getAll()
    names.push(this.toJSON())

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, 'names.json'),
        JSON.stringify(names),
        (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        }
      )
    })
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, 'names.json'),
        'utf-8',
        (err, content) => {
          if (err) {
            reject(err)
          } else {
              if(content){ resolve(JSON.parse(content))}
              else resolve([{name: 'V', ip: '34'}]);
          }
        }
      )
    })
  }
}

module.exports = NamesNodel