import { colors } from 'app/constants/colors';
import { StyleSheet } from 'react-native';

export const s = StyleSheet.create({
  wrapper: {
    height: 400,
    backgroundColor: colors.white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  form: {
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  button: {
    marginVertical: 20,
  },
  textInput: {
    backgroundColor: colors.white,
  },
});
