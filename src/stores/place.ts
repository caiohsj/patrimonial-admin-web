import { defineStore } from 'pinia';
import type { Place } from '@/@types/interfaces/models/place';
import type { CreatePlaceFormData } from '@/@types/interfaces/CreatePlaceFormData';
import PlaceResource from '@/api/resources/place';

type PlaceStoreState = {
  places: Array<Place>;
  place: Place | null;
};

export const usePlaceStore = defineStore('place', {
  state: (): PlaceStoreState => ({
    places: [],
    place: null,
  }),

  getters: {
    placesOptions: (state) => {
      return state.places.map((place, index) => ({
        text: place.description,
        value: index,
      }));
    },
  },

  actions: {
    async fetchPlaces() {
      const { data } = await PlaceResource.index();
      this.places = data;
    },

    createPlace(params: CreatePlaceFormData) {
      return PlaceResource.create(params);
    },

    async fetchPlace(id: number) {
      const { data } = await PlaceResource.show(id);
      this.place = data;
    },

    updatePlace(params: CreatePlaceFormData, id: number) {
      return PlaceResource.update(params, id);
    },

    async deletePlace(place: Place) {
      await PlaceResource.delete(place);
      this.fetchPlaces();
    },
  },
});
