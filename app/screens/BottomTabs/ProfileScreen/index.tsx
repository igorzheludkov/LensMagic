import AuthStack from 'app/navigation/AuthStack';
import { initProfile } from 'app/screens/BottomTabs/ProfileScreen/state';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import {
  addUpdateUserProfile,
  getUserProfile,
} from 'app/store/modules/profile/thunks';
import { IUser } from 'app/types/IProfile';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

export default function ProfileScreen() {
  const dispatch = useAppDispatch();
  const { isAuthorized, user } = useAppSelector(state => state.auth);
  const profileState = useAppSelector(state => state.profile);

  const [profileForm, setProfileForm] = useState<IUser>({
    ...initProfile,
    id: user?.uid || '',
  });

  function handleUpdateProfile() {
    profileForm.id && dispatch(addUpdateUserProfile(profileForm));
  }

  useEffect(() => {
    user?.uid && dispatch(getUserProfile(user.uid));
  }, [user?.uid]);

  useEffect(() => {
    if (profileState.isSuccess) {
      profileState.profile && setProfileForm(profileState.profile);
    }
  }, [profileState]);

  return (
    <>
      {isAuthorized ? (
        <>
          {profileState.isLoading ? (
            <Text>Loading data</Text>
          ) : (
            <Text>Authorized</Text>
          )}
          <TextInput
            onChangeText={text =>
              setProfileForm({ ...profileForm, name: text })
            }
            value={profileForm.name}
          />
          <Button onPress={handleUpdateProfile}>
            <Text>Update profile</Text>
          </Button>
        </>
      ) : (
        <Text>You need to authorize first to see this page</Text>
      )}
    </>
  );
}
