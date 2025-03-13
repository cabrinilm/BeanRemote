import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  cafeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  cafeInfo: {
    flex: 1,
  },
  cafeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  cafeDetails: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 5,
  },
  favoriteButton: {
    padding: 10,
  },
  cafeList: {
    paddingBottom: 20,
  },
});

export default styles;