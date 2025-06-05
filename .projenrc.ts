import { cdk } from 'projen';
import { GithubCredentials } from 'projen/lib/github/github-credentials';

const repoUrl = 'https://github.com/Findlay20/ProjenReactNativeAmplify.git';

const project = new cdk.JsiiProject({

  name: '@Findlay20/projen-react-native-amplify', // Required for GitHub Packages
  repositoryUrl: repoUrl, // Required for GitHub Packages
  repository: repoUrl, // Required for GitHub Packages
  npmRegistryUrl: 'https://npm.pkg.github.com', // Required for GitHub Packages
  releaseToNpm: true, // Required for GitHub Packages
  depsUpgradeOptions: {
    workflowOptions: {
      projenCredentials:
        GithubCredentials.fromPersonalAccessToken({ secret: 'GITHUB_TOKEN' }),
    },
  },

  author: 'Cameron Findlay',
  authorAddress: 'cammy.findlay20@gmail.com',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.8.0',
  projenrcTs: true,
  description: 'A typescript React Native project with an AWS Amplify backend',
  packageName: 'projen-react-native-amplify',
  peerDeps: ['constructs@^10.4.2', 'projen@^0.92.9'],
  devDeps: ['constructs@10.4.2', 'projen@0.92.9'],
  tsconfig: {
    compilerOptions: {
      esModuleInterop: true,
    },
  },
  // deps: [],
});
project.synth();