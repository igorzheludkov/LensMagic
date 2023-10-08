import { colors } from 'app/constants/colors';
import { StyleSheet } from 'react-native';

export const s = StyleSheet.create({
  wrapper: {
    height: 400,
    backgroundColor: colors.white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftContainer: {
    paddingRight: 10,
    // borderWidth: 1,
  },
  rightContainer: {
    flex: 1,
    // borderWidth: 1,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 15,
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
