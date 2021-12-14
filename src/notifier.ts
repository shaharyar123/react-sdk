/**
 * Copyright 2021, Optimizely
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export interface INotifier {
  subscribe(key: string, callback: () => void, unique: string): () => void;
  unsubscribe(key: string): void;
  notify(key: string): void;
}

class Notifier implements INotifier {
  private observers: Array<{ key: string; callback: () => void; unique: string }> = [];
  private static instance: INotifier;

  private constructor() {}

  static getInstance(): INotifier {
    if (!Notifier.instance) {
      Notifier.instance = new Notifier();
    }
    return Notifier.instance;
  }

  subscribe(key: string, callback: () => void, unique: string) {
    this.observers.push({ key, callback, unique });
    console.log('observers', this.observers);

    return () => {
      console.log('hit the func', this.observers);
      console.log('hit the unique', unique);
      console.log('hit the key', key);
      this.observers = this.observers.filter(observer => !(observer.key == key && observer.unique == unique));

      console.log('observers now ', this.observers);
    };
  }
  unsubscribe(key: string) {
    console.log('i am insideeee=');
    this.observers = this.observers.filter(observer => observer.key !== key);
  }
  notify(key: string) {
    this.observers.filter(observer => observer.key === key).forEach(observer => observer.callback());
  }
}

export const notifier: INotifier = Notifier.getInstance();
