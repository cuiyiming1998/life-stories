import type { UserOptions } from 'vite-plugin-pages'

export const pagesConfig: UserOptions = {
  extendRoute(route, parent) {
    if ('/' === route.path) {
      route.redirect = '/home'
    }
  }
}
