import { Link } from "expo-router";
import { StyleSheet } from "react-native-unistyles";
import { ThemedText } from ".";

type Props = {
  pathname: any;
  title: string;
  params?: any;
};

export function CustomLink({ pathname, title, params }: Props) {
  return (
    <Link
      style={styles.link}
      href={{
        pathname,
        params,
      }}
    >
      <ThemedText>{title}</ThemedText>
    </Link>
  );
}

const styles = StyleSheet.create((theme) => ({
  link: {
    borderColor: theme.colors.primary,
    borderWidth: 1,
    padding: 4,
    marginTop: 8,
  },
}));
