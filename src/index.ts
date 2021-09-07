import {Command, flags} from '@oclif/command'

import pqrs from 'pqrs-js'

import sharp from 'sharp'

import util from 'util'

export default class PqrsCli extends Command {
  static description = 'describe the command here'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
  }

  static args = [{name: 'file', required: true}]

  async run() {
    const {args} = this.parse(PqrsCli)

    const pqrs_obj = await pqrs({})

    const {data, info} = await sharp(args.file)
    .ensureAlpha()
    .raw()
    .toBuffer({resolveWithObject: true})

    const {width, height} = info

    const qr = await pqrs_obj.scan_qr({
      data: new Uint8ClampedArray(data.buffer),
      height,
      width,
    })

    this.log(util.inspect(qr, {depth: null, colors: true}))

    /* const name = flags.name ?? 'world'
    this.log(`hello ${name} from ./src/index.ts`)
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    } */
  }
}
