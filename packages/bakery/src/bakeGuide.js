import { deco, logger } from '@spare/logger'
import inquirer         from 'inquirer'
import pain_de_campagne from '../assets/pain_de_campagne'
import toast            from '../assets/toast'

export class BakeGuide {
  static async start() {
    const { scope } = await inquirer.prompt({
      name: 'scope',
      type: 'list',
      default: 0,
      message: 'Do you want to check global, states in the US, or general statistics?',
      choices: [
        { name: 'pain_de_campagne', value: 'pain_de_campagne' },
        { name: 'toast', value: 'toast' },
      ]
    })
    scope |> deco |> logger
  }
}