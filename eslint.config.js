import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import typescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'
import globals from 'globals'

export default [
  js.configs.recommended,
  ...vue.configs['flat/recommended'],
  {
    files: ['**/*.{js,ts,vue}'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: typescriptParser,
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021
      }
    },
    plugins: {
      '@typescript-eslint': typescript
    },
    rules: {
      'no-case-declarations': 'off',
      'no-constant-condition': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      semi: ['error', 'never'],
      'no-prototype-builtins': 'warn',
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-unused-vars': 'off',

      'no-extra-boolean-cast': 'off',
      'no-unused-vars': 'off',
      'no-undef': 'off'
    }
  },
  {
    files: ['**/*.config.js', '**/*.config.ts', '**/*.cjs'],
    languageOptions: {
      globals: {
        ...globals.node,
        module: 'readonly'
      }
    },
    rules: {
      'no-undef': 'off'
    }
  },
  prettierConfig
]
