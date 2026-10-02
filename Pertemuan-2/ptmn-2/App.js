import React, { useState, useRef, useEffect } from "react";
import {
  View,                      // Wadah kontainer tata letak utama (Flexbox)
  Text,                      // Komponen untuk menampilkan teks
  Image,                     // Komponen untuk menampilkan gambar profil
  ScrollView,                // Kontainer berulir untuk halaman yang dapat di-scroll
  FlatList,                  // Komponen daftar horizontal/vertikal yang efisien
  SectionList,               // Komponen daftar berkelompok dengan header sub-seksi
  TextInput,                 // Komponen formulir penginputan teks oleh pengguna
  TouchableOpacity,          // Tombol interaktif dengan efek transisi transparansi
  Switch,                    // Komponen sakelar toggle (On/Off) untuk status pekerjaan
  Modal,                     // Komponen dialog pop-up/overlay layar
  ActivityIndicator,         // Komponen penanda proses pemuatan (loading spinner)
  StatusBar,                 // Komponen pengatur warna & gaya status bar atas HP
  SafeAreaView,              // Komponen pembatas konten agar tidak tertutup notch layar
  StyleSheet,                // Modul untuk membuat objek gaya/styling terstruktur
  Alert,                     // API untuk menampilkan pesan dialog peringatan bawaan OS
  Platform,                  // API untuk mendeteksi sistem operasi (iOS / Android)
  Linking,                   // API untuk membuka tautan eksternal (URL / File PDF)
  KeyboardAvoidingView,      // Komponen penyesuai tata letak agar form tidak tertutup keyboard
  Animated                   // API untuk memberikan efek animasi dan transisi UI
} from 'react-native';

// ============================================================================
// DATA LATIHAN (MODUL DATA / OBJECT STRUCTURE)
// ============================================================================

// Data Profil Pengguna (Objek Data Utama)
const PROFILE = {
  name: 'Dewi Ikrimah',
  title: 'Mahasiswa Informatika',
  email: 'dewi.ikrimah@mail.uinssc.ac.id',
  phone: '08991275370',
  location: 'Cirebon, Jawa Barat',
  bio: 'Mahasiswi Informatika yang sedang aktif mempelajari pemrograman mobile (React Native & Flutter). Bersemangat mengasah keterampilan teknis dan pengalaman praktis melalui proyek perkuliahan serta peluang magang.',
  avatar: 'https://lh3.googleusercontent.com/a/ACg8ocKzHOOwWj-K_SRquTG-Eu7WfVvpPm9pwOECG6ZaV3alc5OlPMs=s192-c-mo',
  pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
};

// Data Keahlian / Skills (Array Objek untuk FlatList Vertikal)
const SKILLS = [
  { id: '1', name: 'React Native',        level: 90, color: '#D4AF37' },
  { id: '2', name: 'Flutter',             level: 75, color: '#9B86EC' },
  { id: '3', name: 'JavaScript',          level: 88, color: '#E2C044' },
  { id: '4', name: 'Creative Writing',    level: 92, color: '#C4A5FA' },
  { id: '5', name: 'Baking & Culinary',   level: 85, color: '#D8A47F' },
  { id: '6', name: 'Mental Health',       level: 88, color: '#7A88B8' },
  { id: '7', name: 'Empathy & Profiling', level: 90, color: '#B388EB' },
  { id: '8', name: 'Critical Analysis',   level: 86, color: '#8FA3C7' },
  { id: '9', name: 'Firebase',            level: 82, color: '#F4C430' },
];

// Data Riwayat Pengalaman & Pendidikan (Array SectionList)
const SECTIONS = [
  {
    title: '🤝 Volunteer & Campaign',
    data: [
      {
        id: 'v1',
        role: 'Volunteer',
        company: 'The Youth Impact',
        period: '2025',
        desc: 'Berpartisipasi aktif dalam program pemberdayaan dan pengembangan pemuda yang diselenggarakan oleh The Youth Impact.',
      },
      {
        id: 'v2',
        role: 'Volunteer',
        company: 'Ramu Suara',
        period: '2025',
        desc: 'Terlibat dalam inisiatif sosial Ramu Suara untuk menyuarakan isu-isu positif dan aspirasi pemuda.',
      },
      {
        id: 'v3',
        role: 'Volunteer / Contributor',
        company: 'Look At Love Across Pealing Peaks',
        period: '2025',
        desc: 'Ikut serta dalam proyek sosial/kemanusiaan "Look At Love Across Pealing Peaks" dalam menyebarkan kepedulian sosial.',
      },
      {
        id: 'v4',
        role: 'Campaign Participant',
        company: 'Campaign Kelana Jiwa',
        period: '2025',
        desc: 'Berperan aktif dalam kampanye "Kelana Jiwa" yang berfokus pada kesadaran kesehatan mental dan pengembangan diri.',
      },
    ],  
  },
  {
    title: '🎓 Pendidikan',
    data: [
      {
        id: 'd1',
        role: 'S1 Informatika',
        company: 'UIN Siber Syekh Nurjati Cirebon',
        period: '2024 - 2028',
        desc: 'IPK 3.85 / 4.00. Aktif dalam kegiatan akademik, pengembangan perangkat lunak, dan aksi sosial.',
      },
      {
        id: 'd2',
        role: 'SMA MIPA',
        company: 'SMA Negeri 1 Cirebon',
        period: '2021 - 2024',
        desc: 'Lulus dengan predikat sangat baik, aktif dalam kegiatan organisasi dan ekstrakurikuler.',
      }
    ],
  },
];

// Data Media Sosial
const SOCIAL = [
  { id: 's1', label: 'Github',    icon: '🧸', url: 'https://github.com/dewi-ikrimah'},
  { id: 's2', label: 'LinkedIn',  icon: '💼', url: 'https://www.linkedin.com/in/dewi-ikrimah-b88a71420/'},
  { id: 's3', label: 'Portofolio', icon: '🌐', url: 'https://dewi.dev'},
];

// ============================================================================
// KOMPONEN CHILD / SUB-KOMPONEN REUSABLE
// ============================================================================

// Komponen Kartu Keahlian (Skill Card) - Dibuat Lebar Penuh (Vertikal)
const SkillCard = ({ item }) => (
  <View style={styles.skillCard}>
    <View style={styles.skillHeader}>
      <Text style={styles.skillName}>{item.name}</Text>
      <Text style={styles.skillPercent}>{item.level}%</Text>
    </View>
    <View style={styles.progressBg}>
      <View
        style={[
          styles.progressFill,
          { width: `${item.level}%`, backgroundColor: item.color },
        ]}
      />
    </View>
  </View>
);

// Komponen Kartu Riwayat (Timeline Card)
const TimelineCard = ({ item, onPress }) => (
  <TouchableOpacity
    style={styles.timelineCard}
    onPress={() => onPress(item)}
    activeOpacity={0.8}
  >
    <View style={styles.timelineDot} />
    <View style={styles.timelineContent}>
      <Text style={styles.timelineRole}>{item.role}</Text>
      <Text style={styles.timelineCompany}>{item.company}</Text>
      <Text style={styles.timelinePeriod}>{item.period}</Text>
      <Text style={styles.timelineHint}>Ketuk untuk detail</Text>
    </View>
  </TouchableOpacity>
);

// ============================================================================
// KOMPONEN UTAMA APLIKASI (APP)
// ============================================================================
export default function App() {
  // --- STATE MANAGEMENT ---
  const [openToWork, setOpenToWork] = useState(true);        // State status pekerjaan
  const [senderName, setSenderName] = useState('');          // State input nama pengirim
  const [message, setMessage] = useState('');                // State input pesan
  const [sending, setSending] = useState(false);             // State status pengiriman pesan
  const [activeTab, setActiveTab] = useState('info');        // State tab aktif
  const [modalVisible, setModalVisible] = useState(false);   // State kontrol modal pop-up
  const [selectedItem, setSelectedItem] = useState(null);    // State item riwayat terpilih

  // --- ANIMATED VALUES ---
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  // Effect Animasi Saat Aplikasi Pertama Kali Dibuka
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // --- HANDLER FUNCTIONS ---

  // Buka Modal Detail Riwayat
  const handleCardPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  // Pengiriman Formulir Pesan
  const handleSendMessage = () => {
    if (!senderName.trim() || !message.trim()) {
      Alert.alert('Peringatan', 'Mohon isi nama dan pesan Anda!');
      return;
    }

    setSending(true);
    setTimeout(() => {
      setSending(false);
      Alert.alert('Sukses', `Pesan dari ${senderName} berhasil dikirim!`);
      setSenderName('');
      setMessage('');
    }, 2000);
  };

  // Membuka Tautan Eksternal dengan Pop-up Konfirmasi (Alert) Menampilkan URL
  const handleOpenLink = (label, url) => {
    Alert.alert(
      `Buka Tautan ${label}`,
      `Apakah Anda ingin membuka link berikut?\n\n${url}`,
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Buka',
          onPress: () => {
            Linking.openURL(url).catch(() => {
              Alert.alert('Error', 'Gagal membuka tautan!');
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  // Fungsi Download PDF dengan Pop-up Konfirmasi Menampilkan URL (Tanpa Loading State)
  const handleDownloadPDF = () => {
    Alert.alert(
      'Unduh / Lihat CV (PDF)',
      `Apakah Anda ingin membuka dokumen PDF dari link berikut?\n\n${PROFILE.pdfUrl}`,
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Ya, Buka',
          onPress: () => {
            Linking.openURL(PROFILE.pdfUrl).catch(() => {
              Alert.alert('Error', 'Gagal membuka atau mengunduh file CV PDF.');
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  // --- LAYOUT RENDERING ---
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D111A" />

      {/* AURA GLOW BACKGROUND DEKORATIF */}
      <View style={styles.bgGlowTop} />
      <View style={styles.bgGlowBottom} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          
          {/* KARTU PROFIL UTAMA (HEADER) */}
          <View style={styles.profileCard}>
            <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
              <View style={styles.avatarBorder}>
                <Image
                  source={{ uri: PROFILE.avatar }}
                  style={styles.avatar}
                />
              </View>
            </Animated.View>

            {openToWork && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>✦ Open to Work</Text>
              </View>
            )}

            <Text style={styles.profileName}>{PROFILE.name}</Text>
            <Text style={styles.profileTitle}>{PROFILE.title}</Text>
            <Text style={styles.profileBio}>{PROFILE.bio}</Text>

            {/* INFORMASI KONTAK (DIBUAT TATA LETAK VERTIKAL / KOLOM) */}
            <View style={styles.contactContainer}>
              <Text style={styles.contactItem}>✉️ {PROFILE.email}</Text>
              <Text style={styles.contactItem}>📍 {PROFILE.location}</Text>
              <Text style={styles.contactItem}>📱 {PROFILE.phone}</Text>
            </View>

            {/* SAKELAR STATUS WORK */}
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Status Open to Work:</Text>
              <Switch
                value={openToWork}
                onValueChange={setOpenToWork}
                trackColor={{ false: '#2C3545', true: '#6B5B95' }}
                thumbColor={openToWork ? '#D4AF37' : '#8A94A6'}
              />
            </View>

            {/* TOMBOL SOSIAL MEDIA (DENGAN POP-UP KONFIRMASI URL) */}
            <View style={styles.socialRow}>
              {SOCIAL.map((s) => (
                <TouchableOpacity
                  key={s.id}
                  style={styles.socialBtn}
                  onPress={() => handleOpenLink(s.label, s.url)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.socialLabel}>{s.icon} {s.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* TOMBOL DOWNLOAD CV PDF (DENGAN POP-UP KONFIRMASI URL LANGSUNG) */}
            <TouchableOpacity
              style={styles.downloadBtn}
              onPress={handleDownloadPDF}
              activeOpacity={0.8}
            >
              <Text style={styles.downloadBtnText}>📥 Download CV (PDF)</Text>
            </TouchableOpacity>

          </View>

          {/* NAVIGASI TAB */}
          <View style={styles.navContainer}>
            <TouchableOpacity
              style={[styles.navTab, activeTab === 'info' && styles.navTabActive]}
              onPress={() => setActiveTab('info')}
            >
              <Text style={[styles.navText, activeTab === 'info' && styles.navTextActive]}>
                Info
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.navTab, activeTab === 'skills' && styles.navTabActive]}
              onPress={() => setActiveTab('skills')}
            >
              <Text style={[styles.navText, activeTab === 'skills' && styles.navTextActive]}>
                Skills
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.navTab, activeTab === 'kontak' && styles.navTabActive]}
              onPress={() => setActiveTab('kontak')}
            >
              <Text style={[styles.navText, activeTab === 'kontak' && styles.navTextActive]}>
                Kontak
              </Text>
            </TouchableOpacity>
          </View>

          {/* TAB 1: INFO (SECTIONLIST) */}
          {activeTab === 'info' && (
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Riwayat & Pengalaman</Text>
              <Text style={styles.sectionSubtitle}>Ketuk kartu untuk melihat ringkasan detail.</Text>
              
              <SectionList
                sections={SECTIONS}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TimelineCard item={item} onPress={handleCardPress} />
                )}
                renderSectionHeader={({ section: { title } }) => (
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionHeaderText}>{title}</Text>
                  </View>
                )}
                scrollEnabled={false}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                SectionSeparatorComponent={() => <View style={{ height: 14 }} />}
              />
            </View>
          )}

          {/* TAB 2: SKILLS (FLATLIST VERTIKAL / KE BAWAH) */}
          {activeTab === 'skills' && (
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>⚡ Keahlian Utama</Text>
              <Text style={styles.sectionSubtitle}>Daftar tingkat kemampuan keahlian.</Text>
              
              <View style={{ marginTop: 10 }}>
                <FlatList
                  data={SKILLS}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => <SkillCard item={item} />}
                  scrollEnabled={false}
                  ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                />
              </View>
            </View>
          )}

          {/* TAB 3: KONTAK (FORM INPUT) */}
          {activeTab === 'kontak' && (
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>✉️ Hubungi Saya</Text>
              <Text style={styles.sectionSubtitle}>Kirimkan pesan langsung ke email saya.</Text>

              <TextInput
                style={styles.textInput}
                placeholder="Nama Anda"
                placeholderTextColor="#6C7A89"
                value={senderName}
                onChangeText={setSenderName}
                returnKeyType="next"
                editable={!sending}
              />

              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Tulis pesan Anda di sini..."
                placeholderTextColor="#6C7A89"
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                editable={!sending}
              />

              {sending ? (
                <View style={styles.loadingRow}>
                  <ActivityIndicator size="small" color="#D4AF37" />
                  <Text style={styles.loadingText}>Mengirim pesan...</Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.submitBtn}
                  onPress={handleSendMessage}
                  activeOpacity={0.8}
                >
                  <Text style={styles.submitBtnText}>Kirim Pesan</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* PADDING BAWAH */}
          <View style={{ height: 35 }} />

        </ScrollView>
      </KeyboardAvoidingView>

      {/* MODAL POP-UP DETAIL RIWAYAT */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedItem && (
              <>
                <Text style={styles.modalTitle}>{selectedItem.role}</Text>
                <Text style={styles.modalCompany}>{selectedItem.company}</Text>
                <Text style={styles.modalPeriod}>🗓️ {selectedItem.period}</Text>
                
                <View style={styles.modalDivider} />
                
                <Text style={styles.modalDescHeader}>Deskripsi / Catatan:</Text>
                <Text style={styles.modalDesc}>{selectedItem.desc}</Text>

                <TouchableOpacity
                  style={styles.modalCloseBtn}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalCloseText}>Tutup</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

// ============================================================================
// STYLESHEET
// ============================================================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D111A',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  
  bgGlowTop: {
    position: 'absolute',
    top: -80,
    right: -80,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(107, 91, 149, 0.25)',
  },
  bgGlowBottom: {
    position: 'absolute',
    bottom: 30,
    left: -80,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(212, 175, 55, 0.12)',
  },

  scroll: {
    flex: 1,
  },

  profileCard: {
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 24,
    backgroundColor: 'rgba(22, 28, 42, 0.75)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.25)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 15,
    elevation: 6,
  },
  avatarBorder: {
    padding: 3,
    borderRadius: 60,
    backgroundColor: '#161C2A',
    borderWidth: 1.5,
    borderColor: '#D4AF37',
    marginBottom: 12,
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
  },
  badge: {
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
  },
  badgeText: {
    color: '#E6C687',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#F0F4F8',
    letterSpacing: 0.3,
  },
  profileTitle: {
    fontSize: 13,
    color: '#A9B7C6',
    fontWeight: '500',
    marginTop: 3,
    letterSpacing: 0.4,
  },
  profileBio: {
    fontSize: 13,
    color: '#8A99AD',
    textAlign: 'center',
    marginVertical: 12,
    lineHeight: 20,
    paddingHorizontal: 4,
  },
  // KONTAINER KONTAK VERTIKAL
  contactContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 4,
    gap: 6,
  },
  contactItem: {
    fontSize: 12,
    color: '#9BAA8C',
    textAlign: 'center',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 8,
  },
  switchLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#8A99AD',
  },
  socialRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  socialBtn: {
    backgroundColor: 'rgba(30, 38, 56, 0.8)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  socialLabel: {
    fontSize: 12,
    color: '#E2E8F0',
    fontWeight: '500',
  },

  downloadBtn: {
    backgroundColor: '#6B5B95',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 18,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
    shadowColor: '#6B5B95',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  downloadBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.3,
  },

  navContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(22, 28, 42, 0.8)',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 25,
    padding: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  navTab: {
    flex: 1,
    paddingVertical: 9,
    alignItems: 'center',
    borderRadius: 20,
  },
  navTabActive: {
    backgroundColor: '#6B5B95',
  },
  navText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#8A99AD',
  },
  navTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  sectionCard: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 20,
    backgroundColor: 'rgba(22, 28, 42, 0.75)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F0F4F8',
    letterSpacing: 0.2,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#6C7A89',
    marginBottom: 14,
  },
  sectionHeader: {
    paddingVertical: 6,
    marginTop: 4,
  },
  sectionHeaderText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#E6C687',
    letterSpacing: 0.4,
  },

  timelineCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    backgroundColor: 'rgba(30, 38, 56, 0.6)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  timelineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D4AF37',
    marginRight: 12,
  },
  timelineContent: {
    flex: 1,
  },
  timelineRole: {
    fontWeight: '600',
    fontSize: 13,
    color: '#F0F4F8',
  },
  timelineCompany: {
    color: '#A9B7C6',
    fontSize: 12,
    marginTop: 1,
  },
  timelinePeriod: {
    fontSize: 11,
    color: '#6C7A89',
    marginTop: 2,
  },
  timelineHint: {
    fontSize: 10,
    color: '#B388EB',
    marginTop: 4,
    fontStyle: 'italic',
  },

  // SKILL CARD (DIUBAH MENJADI LEBAR PENUH / KE BAWAH)
  skillCard: {
    padding: 14,
    backgroundColor: 'rgba(30, 38, 56, 0.6)',
    borderRadius: 14,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  skillName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#F0F4F8',
  },
  skillPercent: {
    fontSize: 11,
    color: '#8A99AD',
  },
  progressBg: {
    height: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },

  textInput: {
    backgroundColor: 'rgba(30, 38, 56, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 13,
    color: '#F0F4F8',
    marginBottom: 12,
  },
  textArea: {
    height: 100,
  },
  submitBtn: {
    backgroundColor: '#6B5B95',
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 4,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  loadingText: {
    fontSize: 13,
    color: '#A9B7C6',
    fontWeight: '500',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(5, 7, 12, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#161C2A',
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.25)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#F0F4F8',
  },
  modalCompany: {
    fontSize: 13,
    color: '#A9B7C6',
    fontWeight: '500',
    marginTop: 2,
  },
  modalPeriod: {
    fontSize: 11,
    color: '#6C7A89',
    marginTop: 4,
  },
  modalDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginVertical: 14,
  },
  modalDescHeader: {
    fontSize: 11,
    fontWeight: '600',
    color: '#E6C687',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  modalDesc: {
    fontSize: 13,
    color: '#8A99AD',
    lineHeight: 19,
    marginBottom: 18,
  },
  modalCloseBtn: {
    backgroundColor: '#6B5B95',
    paddingVertical: 11,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalCloseText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
});