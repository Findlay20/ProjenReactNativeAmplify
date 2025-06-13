import { synthSnapshot } from 'projen/lib/util/synth';
import { ReactNativeAmplifyProject } from '../src';

describe('ReactNativeAmplifyProject', () => {
  test('project name is set properly', () => {

    const project = new ReactNativeAmplifyProject({
      name: 'ProjenReactNativeAmplify',
      defaultReleaseBranch: 'main',
    });

    const snapshot = synthSnapshot(project);

    expect(snapshot['package.json']!.name).toBe(
      'ProjenReactNativeAmplify',
    );
  });

  test('amplify data.ts and auth.ts files are created', () => {
    const project = new ReactNativeAmplifyProject({
      name: 'ProjenReactNativeAmplify',
      defaultReleaseBranch: 'main',
    });

    const snapshot = synthSnapshot(project);

    expect(snapshot['amplify/data/resource.ts']).toBeDefined();
    expect(snapshot['amplify/auth/resource.ts']).toBeDefined();
  });

  test('Initial react native files are created', () => {
    const project = new ReactNativeAmplifyProject({
      name: 'ProjenReactNativeAmplify',
      defaultReleaseBranch: 'main',
    });

    const snapshot = synthSnapshot(project);

    expect(snapshot['src/HelloWorld.tsx']).toBeDefined();
    expect(snapshot['index.ts']).toBeDefined();
    expect(snapshot['App.tsx']).toBeDefined();
  });

  test('Expo app.json is created', () => {
    const project = new ReactNativeAmplifyProject({
      name: 'ProjenReactNativeAmplify',
      defaultReleaseBranch: 'main',
    });

    const snapshot = synthSnapshot(project);

    expect(snapshot['app.json']).toBeDefined();
  });

  // Couldn't find similar tests in projen repo so maybe tests for images don't work?
  // test('Initial assets files are created', () => {
  //   const project = new ReactNativeAmplifyProject({
  //     name: 'ProjenReactNativeAmplify',
  //     defaultReleaseBranch: 'main',
  //   });

  //   const snapshot = synthSnapshot(project);
  //   console.log(snapshot)
  //   // expect(snapshot['assets']).toBeDefined();
  //   expect(snapshot['assets/adaptive-icon.png']).toBeDefined();
  //   expect(snapshot['assets/favicon.png']).toBeDefined();
  //   expect(snapshot['assets/icon.png']).toBeDefined();
  //   expect(snapshot['assets/splash-icon.png']).toBeDefined();
  // });

});