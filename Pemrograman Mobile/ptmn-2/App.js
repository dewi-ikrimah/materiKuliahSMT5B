import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>CURRICULUM VITAE</Text>

      <Text style={styles.label}>Nama Lengkap</Text>
      <Text style={styles.text}>Dewi Ikrimah</Text>

      <Text style={styles.label}>NIM</Text>
      <Text style={styles.text}>2488010049</Text>

      <Text style={styles.label}>Asal Sekolah</Text>
      <Text style={styles.text}>SMAN 1 Juntinyuat</Text>

      <Text style={styles.label}>Cita-Cita</Text>
      <Text style={styles.text}>Software Engineer</Text>

      <Text style={styles.label}>Rencana Menggapai Cita-cita</Text>
      <Text style={styles.text}>
          Saya akan terus belajar pemrograman, mengembangkan proyek dan portofolio, serta mencari pengalaman melalui magang atau kegiatan lainnya. Setelah lulus, saya ingin bekerja sebagai Software Engineer dan terus mengembangkan kemampuan.
      </Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 25,
    justifyContent: 'center',
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  }, 

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
  },

  text: {
    fontSize: 16,
    marginTop: 5,
  },
});