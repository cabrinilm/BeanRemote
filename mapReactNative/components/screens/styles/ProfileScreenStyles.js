import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingTop: 20,
  },
  header: {
    paddingVertical: 20,
    backgroundColor: '#4CAF50', // cor de fundo do header
    alignItems: 'center',
    justifyContent: 'center',
  },
  coffeeImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 10,
  },
  coffeeName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  coffeeTagline: {
    fontSize: 16,
    color: '#fff',
    fontStyle: 'italic',
  },
  contentContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  amenitiesContainer: {
    marginBottom: 20,
  },
  amenityItem: {
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
    paddingLeft: 10,
    position: 'relative',
  },
  amenityIcon: {
    position: 'absolute',
    left: 0,
    top: 2,
    width: 12,
    height: 12,
    backgroundColor: '#4CAF50',
    borderRadius: 6,
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
    height: 150,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  editButton: {
    width: '80%',
    paddingVertical: 12,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default styles;
