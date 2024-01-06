<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue';
import { useForm } from 'vee-validate';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useSessionStore } from '@/stores/session';
import { useUserStore } from '@/stores/user';
import BaseButton from '@/components/buttons/BaseButton.vue';
import InputGroup from '@/components/inputs/InputGroup.vue';
import FileInputGroup from '@/components/inputs/FileInputGroup.vue';
import SafeImage from '@/components/common/SafeImage.vue';

const imageSelected = ref<File | string>('');
const { t } = useI18n();
const { updateProfile } = useUserStore();
const { currentUser } = storeToRefs(useSessionStore());
const { handleSubmit, setValues } = useForm<{
  name: string;
  email: string;
}>();
const userAvatar = computed((): string => {
  if (imageSelected.value && typeof imageSelected.value == 'string')
    return imageSelected.value;

  if (imageSelected.value && typeof imageSelected.value != 'string')
    return URL.createObjectURL(imageSelected.value);

  if (currentUser.value?.avatar) return currentUser.value.avatar;

  return '';
});

const handleImageSelected = (image: FileList | string | null | undefined) => {
  if (image && image instanceof FileList) {
    imageSelected.value = image[0];
  }

  if (typeof image == 'string') imageSelected.value = image;
};

const onSubmit = handleSubmit(({ name, email }) => {
  updateProfile(name, email, imageSelected.value);
});

onMounted(() => {
  setValues({
    name: currentUser.value?.name,
    email: currentUser.value?.email,
  });
});
</script>

<template>
  <div class="user-profile-view flex bg-light p-10 w-full rounded-md">
    <form class="flex w-full" @submit="onSubmit">
      <div class="flex flex-col w-fit items-center pr-10">
        <SafeImage
          :src="userAvatar"
          :alt="t('views.userProfileView.avatarAlt')"
          placeholder="/images/Avatar.jpg"
        />
        <span class="text-xl font-baloo2-bold">{{ currentUser?.name }}</span>
        <span class="text-gray-darken mb-4">{{ currentUser?.role.name }}</span>

        <FileInputGroup
          @selected-filed="handleImageSelected"
          :multiple="true"
          :label="t('views.userProfileView.form.labels.avatar')"
          accept="image/*"
          capture="user"
          name="images"
          rules="required"
          size="small"
        />
      </div>

      <div class="flex flex-col gap-4 w-full" @submit="onSubmit">
        <div class="flex justify-between">
          <span class="text-lg font-baloo2-bold">{{
            t('views.userProfileView.title')
          }}</span>

          <BaseButton class="px-4" type="submit">{{
            t('views.userProfileView.form.submit')
          }}</BaseButton>
        </div>

        <InputGroup
          :label="t('views.userProfileView.form.labels.name')"
          name="name"
          type="text"
        />

        <InputGroup
          :label="t('views.userProfileView.form.labels.email')"
          name="email"
          type="email"
        />
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.user-profile-view {
  .safe-image {
    width: 180px;
    height: 180px;
    clip-path: circle();
  }
}
</style>
