class Event<T> {
  #subscribers: ((data: T) => Promise<void>)[] = [];

  subscribe(callback: (data: T) => Promise<void>) {
    this.#subscribers.push(callback);
  }

  unsubscribe(callback: (data: T) => Promise<void>) {
    this.#subscribers = this.#subscribers.filter((sub) => sub !== callback);
  }

  publish(data: T) {
    for (const sub of this.#subscribers) {
      sub(data);
    }
  }
}

export const UpdateDataEvent = new Event<{ accessor: string; value: unknown }>();
export const DeleteArrayDataEvent = new Event<{ accessor: string; idx: number }>();
