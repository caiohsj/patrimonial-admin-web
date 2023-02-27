import { defineStore } from 'pinia';
import type { Place } from '@/@types/interfaces/models/place';
import PlaceResource from '@/api/resources/place';

type PlaceStoreState = {
  places: Array<Place>;
};

export const usePlaceStore = defineStore('place', {
  state: (): PlaceStoreState => ({
    places: [],
  }),

  getters: {
    placesOptions: (state) => {
      return state.places.map((place) => ({
        text: place.description,
        value: place.id,
      }));
    },
  },

  actions: {
    async fetchPlaces() {
      const { data } = await PlaceResource.index();
      this.places = data;
    },
  },
});