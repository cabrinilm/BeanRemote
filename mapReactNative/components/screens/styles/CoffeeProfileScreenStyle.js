import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  coffeeImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    objectFit: 'cover',
  },
  coffeeName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  coffeeDescription: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 10,
  },
  amenitiesContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  amenityItem: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  openingHoursContainer: {
    marginBottom: 20,
  },
  openingHours: {
    fontSize: 16,
    color: '#555',
  },
  photosContainer: {
    marginBottom: 20,
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  photo: {
    width: '48%',
    height: 120,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
  },
  locationContainer: {
    marginBottom: 20,
  },
  location: {
    fontSize: 16,
    color: '#555',
  },
});
export default styles;
