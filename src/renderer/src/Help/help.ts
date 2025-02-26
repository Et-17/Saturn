// This contains all currently mounted nodes with help text, in a dictionary of
// the ids passed to the helpText directive. When something gets unmounted the

import { Ref, ref, shallowRef, ShallowRef } from "vue";

// id of the directive is removed from this variable.
// export let elements_with_help_text: Ref<Record<string, [string, HTMLElement]>> = ref({});
export let elements_with_help_text: Ref<Map<string, [string, HTMLElement]>> = ref(new Map());

type MountHelpBinding = {arg: any, modifiers: any, value: {id: string, text: string}, oldValue: any};
type UnmountHelpBinding = {arg: any, modifiers: any, value: any, oldValue: {id: string, text: string}};

export const vHelpText = {
    mounted(el: HTMLElement, binding: MountHelpBinding) {
        elements_with_help_text.value.set(binding.value.id, [binding.value.text, el]);
        console.log(elements_with_help_text.value);
    },

    beforeUnmount(_: HTMLElement, binding: UnmountHelpBinding) {
        elements_with_help_text.value.delete(binding.value.id);
        console.log(elements_with_help_text.value);
    }
}
