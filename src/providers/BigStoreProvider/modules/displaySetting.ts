import { axios } from "@/frontend/libs";
import { DisplaySettingPayload } from "@/shared/payloads/DisplaySettingPayload";
import { useBigStore } from "../context";

function useDisplaySetting() {
  const { store, setStore } = useBigStore();
  const displaySetting = store?.displaySetting;

  const setDisplaySetting = (payload: DisplaySettingPayload) => {
    setStore({
      ...store,
      displaySetting: payload
    });
  };

  const updateDisplaySetting = async () => {
    await axios.put(`/api/store/display-settings/put`, displaySetting);
  };

  return { displaySetting, setDisplaySetting, updateDisplaySetting };
}

export default useDisplaySetting;
