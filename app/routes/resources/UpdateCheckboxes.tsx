import {type ActionFunctionArgs} from 'react-router'
import { useFetcher } from 'react-router'


export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const name = formData.get('name');
    return null;
};

export const useUpdateCheckbox = () => {
    const fetcher = useFetcher({ key: 'resource.checkbox.update' })
    


return {
    ...fetcher, submit: (checkBoxData: { checkbox: 'string'; }) => {
        const formData = new FormData();
        formData.set("checkbox", checkBoxData.checkbox);
        fetcher.submit(formData, {
            method: 'POST',
            action: '/resources/checkboxes',
        });
    }

};
// encType: 'application/x-www-form-urlencoded',
};