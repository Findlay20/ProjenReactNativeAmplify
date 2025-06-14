import * as path from 'path';
import { JsonFile, SampleDir, SampleFile } from 'projen';
import { TypescriptConfigExtends, TypeScriptJsxMode } from 'projen/lib/javascript';
import { TypeScriptProject, TypeScriptProjectOptions } from 'projen/lib/typescript';


export interface ReactNativeAmplifyProjectOptions extends TypeScriptProjectOptions {
  readonly prMention?: string;
  readonly reactVersion?: string;
  readonly reactNativeVersion?: string;
}

//TODO: Make expo build an option and include react-native's built in build method?
export class ReactNativeAmplifyProject extends TypeScriptProject {
  constructor(options: ReactNativeAmplifyProjectOptions) {
    super({
      entrypoint: 'index.ts',
      ...options,
      sampleCode: false,
      pullRequestTemplate: false,
      tsconfig: {
        extends: TypescriptConfigExtends.fromPaths(['expo/tsconfig.base']),
        compilerOptions: {
          module: 'esnext',
          jsx: TypeScriptJsxMode.REACT_JSX,
        },
        include: ['*.ts', '*.tsx', 'src/**/*.ts', 'src/**/*.tsx'], // update
      },
      tsconfigDev: {
        compilerOptions: {
          module: 'esnext',
          jsx: TypeScriptJsxMode.REACT_JSXDEV,
        },
        include: ['*.ts', '*.tsx', 'src/**/*.ts', 'src/**/*.tsx', 'test/**/*.ts', '.projenrc.ts', 'projenrc/**/*.ts'],
      },
      eslint: true,
      eslintOptions: {
        dirs: ['src'],
        fileExtensions: ['.ts', '.tsx'],
        devdirs: ['test', 'projenrc'],
      },
    });
    this.updateGitIgnore();
    this.configureDependencies(options);
    this.updateNpmScripts();
    this.createAmplifyFiles();
    this.createReactNativeFiles();
    this.createAssets();
    this.createAppJson();
  }

  protected updateGitIgnore() {
    this.gitignore.addPatterns(
      'android',
      'dist/',
      '.amplify',
      '.expo',
      'amplify_outputs*',
      'amplifyconfiguration*',
    );
  }

  protected updateNpmScripts() {
    this.addScripts({
      'start': 'expo start',
      'prebuild': 'expo prebuild',
      'android': 'expo run:android',
      'android:go': 'expo start --android',
      'ios': 'expo run:ios',
      'ios:go': 'expo start --ios',
      'web': 'expo start --web',
      'sandbox': 'ampx sandbox',
    });
  }

  protected createAppJson() {
    new JsonFile(this, 'app.json', {
      obj: {
        expo: {
          name: this.name,
          slug: this.name,
          version: '1.0.0',
          orientation: 'portrait',
          icon: './assets/icon.png',
          userInterfaceStyle: 'light',
          newArchEnabled: true,
          splash: {
            image: './assets/splash.png',
            resizeMode: 'contain',
            backgroundColor: '#ffffff',
          },
          ios: {
            supportsTablet: true,
          },
          android: {
            adaptiveIcon: {
              foregroundImage: './assets/adaptive-icon.png',
              backgroundColor: '#FFFFFF',
            },
            edgeToEdgeEnabled: true,
            package: `com.anonymous.${this.name}`,
          },
          web: {
            favicon: './assets/favicon.png',
          },
        },
      },
    });
  }

  protected createAssets() {
    new SampleDir(this, 'assets', {
      sourceDir: path.join(__dirname, '..', 'initial-files', 'assets'),
    });
    // new SampleFile(this, 'assets/adaptive-icon.png', {
    //     sourcePath: path.join(__dirname, '..', 'initial-files', 'assets', 'adaptive-icon.png')
    // })
  };

  protected createReactNativeFiles() {
    new SampleDir(this, 'src', {
      sourceDir: path.join(__dirname, '..', 'initial-files', 'src'),
    });
    new SampleFile(this, 'index.ts', {
      sourcePath: path.join(__dirname, '..', 'initial-files', 'react-native', 'index.ts'),
    });
    new SampleFile(this, 'App.tsx', {
      sourcePath: path.join(__dirname, '..', 'initial-files', 'react-native', 'App.tsx'),
    });
  };

  protected createAmplifyFiles() {
    new SampleDir(this, 'amplify', {
      sourceDir: path.join(__dirname, '..', 'initial-files', 'amplify'),
    });
  };

  protected configureDependencies(options: ReactNativeAmplifyProjectOptions) {
    const reactVersion = options.reactVersion ?? '19.0.0';
    const reactNativeVersion = options.reactNativeVersion ?? '0.79.2';

    this.addDeps(
      '@aws-amplify/react-native@^1.1.10',
      '@aws-amplify/ui-react-native@^2.5.3',
      '@expo/metro-runtime@~5.0.4',
      '@react-native-async-storage/async-storage@^2.1.2',
      '@react-native-community/netinfo@^11.4.1',
      'aws-amplify@^6.15.0',
      'expo@~53.0.9',
      'expo-status-bar@~2.2.3',
      `react@${reactVersion}`,
      'react-dom@19.0.0',
      `react-native@${reactNativeVersion}`,
      'react-native-get-random-values@^1.11.0',
      'react-native-safe-area-context@5.4.1',
      'react-native-url-polyfill@^2.0.0',
      'react-native-web@^0.20.0',
      ...(options.deps || []),
    );

    this.addDevDeps(
      '@aws-amplify/backend@^1.16.1',
      '@aws-amplify/backend-cli@^1.7.2',
      '@babel/core@^7.20.0',
      '@types/react@~19.0.10',
      'aws-cdk-lib@^2.189.1',
      'constructs@^10.4.2',
      'esbuild@^0.25.5',
      'tsx@^4.19.4',
      ...(options.devDeps || []),
    );
  };
}