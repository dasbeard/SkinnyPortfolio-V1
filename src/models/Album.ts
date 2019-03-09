export class AlbumModel {
  uid?: string;
  album?: string;
  artist?: string;
  image?: string;
  image2?: string;
  year?: number;
  credits?: [Credits];
}

export class Credits {
  title?: string;
}
