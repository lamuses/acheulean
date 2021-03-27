import { Deco, deco, logger, says } from '@spare/logger'
import { mapper, range, zipper }    from '@vect/vector'
import inquirer                     from 'inquirer'
import pain_de_campagne             from '../assets/pain_de_campagne'
import toast                        from '../assets/toast'
import { mapper as mapperObject }   from '@vect/object'
import { roundD1 }                  from '@aryth/math'

const CATALOGUE = {
  toast,
  pain_de_campagne
}

export class BakeGuide {
  static async start() {
    const { bread } = await inquirer.prompt({
      name: 'bread',
      type: 'list',
      default: 0,
      message: 'Please select the type of bread...',
      choices: [
        { name: 'pain_de_campagne', value: 'pain_de_campagne' },
        { name: 'toast', value: 'toast' },
      ]
    })
    const { count } = await inquirer.prompt({
      name: 'count',
      type: 'list',
      default: 25,
      message: 'How many do you want for a batch?',
      choices: zipper(range(0, 100), range(0, 100), (name, value) => ({ name, value }))
    });
    ({ bread, count }) |> deco |> says['selection']
    const recipes = CATALOGUE[bread]
    const result = mapper(recipes, recipe => mapperObject(recipe, quant => roundD1(quant * count)))
    const _deco = Deco({ vert: 2 })
    result |> _deco |> says['quantity suggestion']
  }
}