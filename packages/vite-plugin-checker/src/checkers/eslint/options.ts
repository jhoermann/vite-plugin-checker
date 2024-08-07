/* eslint-disable */

/**
 * This file is directly copied from https://github.com/eslint/eslint/blob/main/lib/options.js
 *
 * @fileoverview Options configuration for optionator.
 * @author George Zahariev
 */

'use strict'

import { createRequire } from 'node:module'
const _require = createRequire(import.meta.url)
import { dirname } from 'node:path'

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const eslintDir = dirname(_require.resolve('eslint/package.json'))
const optionatorPath = _require.resolve('optionator', {
  paths: [eslintDir],
})
const optionator = _require(optionatorPath)

//------------------------------------------------------------------------------
// Typedefs
//------------------------------------------------------------------------------

/**
 * The options object parsed by Optionator.
 * @typedef {Object} ParsedCLIOptions
 * @property {boolean} cache Only check changed files
 * @property {string} cacheFile Path to the cache file. Deprecated: use --cache-location
 * @property {string} [cacheLocation] Path to the cache file or directory
 * @property {"metadata" | "content"} cacheStrategy Strategy to use for detecting changed files in the cache
 * @property {boolean} [color] Force enabling/disabling of color
 * @property {string} [config] Use this configuration, overriding .eslintrc.* config options if present
 * @property {boolean} debug Output debugging information
 * @property {string[]} [env] Specify environments
 * @property {boolean} envInfo Output execution environment information
 * @property {boolean} errorOnUnmatchedPattern Prevent errors when pattern is unmatched
 * @property {boolean} eslintrc Disable use of configuration from .eslintrc.*
 * @property {string[]} [ext] Specify JavaScript file extensions
 * @property {boolean} fix Automatically fix problems
 * @property {boolean} fixDryRun Automatically fix problems without saving the changes to the file system
 * @property {("directive" | "problem" | "suggestion" | "layout")[]} [fixType] Specify the types of fixes to apply (directive, problem, suggestion, layout)
 * @property {string} format Use a specific output format
 * @property {string[]} [global] Define global variables
 * @property {boolean} [help] Show help
 * @property {boolean} ignore Disable use of ignore files and patterns
 * @property {string} [ignorePath] Specify path of ignore file
 * @property {string[]} [ignorePattern] Pattern of files to ignore (in addition to those in .eslintignore)
 * @property {boolean} init Run config initialization wizard
 * @property {boolean} inlineConfig Prevent comments from changing config or rules
 * @property {number} maxWarnings Number of warnings to trigger nonzero exit code
 * @property {string} [outputFile] Specify file to write report to
 * @property {string} [parser] Specify the parser to be used
 * @property {Object} [parserOptions] Specify parser options
 * @property {string[]} [plugin] Specify plugins
 * @property {string} [printConfig] Print the configuration for the given file
 * @property {boolean | undefined} reportUnusedDisableDirectives Adds reported errors for unused eslint-disable directives
 * @property {string} [resolvePluginsRelativeTo] A folder where plugins should be resolved from, CWD by default
 * @property {Object} [rule] Specify rules
 * @property {string[]} [rulesdir] Load additional rules from this directory. Deprecated: Use rules from plugins
 * @property {boolean} stdin Lint code provided on <STDIN>
 * @property {string} [stdinFilename] Specify filename to process STDIN as
 * @property {boolean} quiet Report errors only
 * @property {boolean} [version] Output the version number
 * @property {string[]} _ Positional filenames or patterns
 */

//------------------------------------------------------------------------------
// Initialization and Public Interface
//------------------------------------------------------------------------------

// exports "parse(args)", "generateHelp()", and "generateHelpForOption(optionName)"
export const options = optionator({
  prepend: 'eslint [options] file.js [file.js] [dir]',
  defaults: {
    concatRepeatedArrays: true,
    mergeRepeatedObjects: true,
  },
  options: [
    {
      heading: 'Basic configuration',
    },
    {
      option: 'eslintrc',
      type: 'Boolean',
      default: 'true',
      description: 'Disable use of configuration from .eslintrc.*',
    },
    {
      option: 'config',
      alias: 'c',
      type: 'path::String',
      description: 'Use this configuration, overriding .eslintrc.* config options if present',
    },
    {
      option: 'env',
      type: '[String]',
      description: 'Specify environments',
    },
    {
      option: 'ext',
      type: '[String]',
      description: 'Specify JavaScript file extensions',
    },
    {
      option: 'global',
      type: '[String]',
      description: 'Define global variables',
    },
    {
      option: 'parser',
      type: 'String',
      description: 'Specify the parser to be used',
    },
    {
      option: 'parser-options',
      type: 'Object',
      description: 'Specify parser options',
    },
    {
      option: 'resolve-plugins-relative-to',
      type: 'path::String',
      description: 'A folder where plugins should be resolved from, CWD by default',
    },
    {
      heading: 'Specifying rules and plugins',
    },
    {
      option: 'plugin',
      type: '[String]',
      description: 'Specify plugins',
    },
    {
      option: 'rule',
      type: 'Object',
      description: 'Specify rules',
    },
    {
      option: 'rulesdir',
      type: '[path::String]',
      description: 'Load additional rules from this directory. Deprecated: Use rules from plugins',
    },
    {
      heading: 'Fixing problems',
    },
    {
      option: 'fix',
      type: 'Boolean',
      default: false,
      description: 'Automatically fix problems',
    },
    {
      option: 'fix-dry-run',
      type: 'Boolean',
      default: false,
      description: 'Automatically fix problems without saving the changes to the file system',
    },
    {
      option: 'fix-type',
      type: 'Array',
      description: 'Specify the types of fixes to apply (directive, problem, suggestion, layout)',
    },
    {
      heading: 'Ignoring files',
    },
    {
      option: 'ignore-path',
      type: 'path::String',
      description: 'Specify path of ignore file',
    },
    {
      option: 'ignore',
      type: 'Boolean',
      default: 'true',
      description: 'Disable use of ignore files and patterns',
    },
    {
      option: 'ignore-pattern',
      type: '[String]',
      description: 'Pattern of files to ignore (in addition to those in .eslintignore)',
      concatRepeatedArrays: [
        true,
        {
          oneValuePerFlag: true,
        },
      ],
    },
    {
      heading: 'Using stdin',
    },
    {
      option: 'stdin',
      type: 'Boolean',
      default: 'false',
      description: 'Lint code provided on <STDIN>',
    },
    {
      option: 'stdin-filename',
      type: 'String',
      description: 'Specify filename to process STDIN as',
    },
    {
      heading: 'Handling warnings',
    },
    {
      option: 'quiet',
      type: 'Boolean',
      default: 'false',
      description: 'Report errors only',
    },
    {
      option: 'max-warnings',
      type: 'Int',
      default: '-1',
      description: 'Number of warnings to trigger nonzero exit code',
    },
    {
      heading: 'Output',
    },
    {
      option: 'output-file',
      alias: 'o',
      type: 'path::String',
      description: 'Specify file to write report to',
    },
    {
      option: 'format',
      alias: 'f',
      type: 'String',
      default: 'stylish',
      description: 'Use a specific output format',
    },
    {
      option: 'color',
      type: 'Boolean',
      alias: 'no-color',
      description: 'Force enabling/disabling of color',
    },
    {
      heading: 'Inline configuration comments',
    },
    {
      option: 'inline-config',
      type: 'Boolean',
      default: 'true',
      description: 'Prevent comments from changing config or rules',
    },
    {
      option: 'report-unused-disable-directives',
      type: 'Boolean',
      default: void 0,
      description: 'Adds reported errors for unused eslint-disable directives',
    },
    {
      heading: 'Caching',
    },
    {
      option: 'cache',
      type: 'Boolean',
      default: 'false',
      description: 'Only check changed files',
    },
    {
      option: 'cache-file',
      type: 'path::String',
      default: '.eslintcache',
      description: 'Path to the cache file. Deprecated: use --cache-location',
    },
    {
      option: 'cache-location',
      type: 'path::String',
      description: 'Path to the cache file or directory',
    },
    {
      option: 'cache-strategy',
      dependsOn: ['cache'],
      type: 'String',
      default: 'metadata',
      enum: ['metadata', 'content'],
      description: 'Strategy to use for detecting changed files in the cache',
    },
    {
      heading: 'Miscellaneous',
    },
    {
      option: 'init',
      type: 'Boolean',
      default: 'false',
      description: 'Run config initialization wizard',
    },
    {
      option: 'env-info',
      type: 'Boolean',
      default: 'false',
      description: 'Output execution environment information',
    },
    {
      option: 'error-on-unmatched-pattern',
      type: 'Boolean',
      default: 'true',
      description: 'Prevent errors when pattern is unmatched',
    },
    {
      option: 'exit-on-fatal-error',
      type: 'Boolean',
      default: 'false',
      description: 'Exit with exit code 2 in case of fatal error',
    },
    {
      option: 'debug',
      type: 'Boolean',
      default: false,
      description: 'Output debugging information',
    },
    {
      option: 'help',
      alias: 'h',
      type: 'Boolean',
      description: 'Show help',
    },
    {
      option: 'version',
      alias: 'v',
      type: 'Boolean',
      description: 'Output the version number',
    },
    {
      option: 'print-config',
      type: 'path::String',
      description: 'Print the configuration for the given file',
    },
  ],
})
