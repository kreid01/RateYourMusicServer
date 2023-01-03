/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */







declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  LoginResponse: { // root type
    accessToken?: string | null; // String
    refreshToken?: string | null; // String
  }
  Mutation: {};
  Query: {};
  Subscription: {};
  artist: { // root type
    born?: string | null; // String
    genres?: Array<string | null> | null; // [String]
    id?: number | null; // Int
    name?: string | null; // String
    relatedArtists?: Array<string | null> | null; // [String]
    type?: string | null; // String
  }
  channel: { // root type
    id?: number | null; // Int
    releaseId?: number | null; // Int
    title?: string | null; // String
  }
  message: { // root type
    channelId?: number | null; // Int
    content?: string | null; // String
    id?: number | null; // Int
    postDate?: string | null; // String
    posterId?: number | null; // Int
  }
  release: { // root type
    artistId?: number | null; // Int
    cover?: string | null; // String
    genres?: Array<string | null> | null; // [String]
    id?: number | null; // Int
    language?: string | null; // String
    rating?: number | null; // Float
    ratingCount?: number | null; // Int
    released?: string | null; // String
    title?: string | null; // String
    tracks?: Array<string | null> | null; // [String]
    type?: string | null; // String
  }
  review: { // root type
    description?: string | null; // String
    id?: number | null; // Int
    postDate?: string | null; // String
    posterId?: number | null; // Int
    rating?: number | null; // Int
    releaseId?: number | null; // Int
    title?: string | null; // String
  }
  user: { // root type
    email?: string | null; // String
    id?: number | null; // Int
    password?: string | null; // String
    username?: string | null; // String
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  LoginResponse: { // field return type
    accessToken: string | null; // String
    refreshToken: string | null; // String
  }
  Mutation: { // field return type
    deleteArtist: NexusGenRootTypes['artist'] | null; // artist
    deleteChannel: NexusGenRootTypes['channel'] | null; // channel
    deleteRelease: NexusGenRootTypes['release'] | null; // release
    deleteReview: NexusGenRootTypes['review'] | null; // review
    deleteUser: NexusGenRootTypes['user'] | null; // user
    deletemessage: NexusGenRootTypes['message'] | null; // message
    login: NexusGenRootTypes['LoginResponse'] | null; // LoginResponse
    postArtist: NexusGenRootTypes['artist'] | null; // artist
    postChannel: NexusGenRootTypes['channel'] | null; // channel
    postMessage: NexusGenRootTypes['message'] | null; // message
    postRelease: NexusGenRootTypes['release'] | null; // release
    postReview: NexusGenRootTypes['review'] | null; // review
    register: NexusGenRootTypes['user'] | null; // user
    updateArtist: NexusGenRootTypes['artist'] | null; // artist
    updateChannel: NexusGenRootTypes['channel'] | null; // channel
    updateRelease: NexusGenRootTypes['release'] | null; // release
    updateReview: NexusGenRootTypes['review'] | null; // review
  }
  Query: { // field return type
    getAllArtists: Array<NexusGenRootTypes['artist'] | null> | null; // [artist]
    getAllChannels: Array<NexusGenRootTypes['channel'] | null> | null; // [channel]
    getAllReleases: Array<NexusGenRootTypes['release'] | null> | null; // [release]
    getArtistById: NexusGenRootTypes['artist'] | null; // artist
    getChannelById: NexusGenRootTypes['channel'] | null; // channel
    getChatMessages: Array<NexusGenRootTypes['message'] | null> | null; // [message]
    getReleaseById: NexusGenRootTypes['release'] | null; // release
    getReleaseReviews: Array<NexusGenRootTypes['review'] | null> | null; // [review]
    getReviewById: NexusGenRootTypes['review'] | null; // review
    getReviews: Array<NexusGenRootTypes['review'] | null> | null; // [review]
    getUser: NexusGenRootTypes['user'] | null; // user
    getUserById: NexusGenRootTypes['user'] | null; // user
    getUsers: Array<NexusGenRootTypes['user'] | null> | null; // [user]
    getmessageById: NexusGenRootTypes['message'] | null; // message
    searchArtists: Array<NexusGenRootTypes['artist'] | null> | null; // [artist]
    searchReleases: Array<NexusGenRootTypes['release'] | null> | null; // [release]
  }
  Subscription: { // field return type
    newMessage: NexusGenRootTypes['message'] | null; // message
  }
  artist: { // field return type
    born: string | null; // String
    genres: Array<string | null> | null; // [String]
    id: number | null; // Int
    name: string | null; // String
    relatedArtists: Array<string | null> | null; // [String]
    type: string | null; // String
  }
  channel: { // field return type
    id: number | null; // Int
    releaseId: number | null; // Int
    title: string | null; // String
  }
  message: { // field return type
    channelId: number | null; // Int
    content: string | null; // String
    id: number | null; // Int
    postDate: string | null; // String
    posterId: number | null; // Int
  }
  release: { // field return type
    artistId: number | null; // Int
    cover: string | null; // String
    genres: Array<string | null> | null; // [String]
    id: number | null; // Int
    language: string | null; // String
    rating: number | null; // Float
    ratingCount: number | null; // Int
    released: string | null; // String
    title: string | null; // String
    tracks: Array<string | null> | null; // [String]
    type: string | null; // String
  }
  review: { // field return type
    description: string | null; // String
    id: number | null; // Int
    postDate: string | null; // String
    posterId: number | null; // Int
    rating: number | null; // Int
    releaseId: number | null; // Int
    title: string | null; // String
  }
  user: { // field return type
    email: string | null; // String
    id: number | null; // Int
    password: string | null; // String
    username: string | null; // String
  }
}

export interface NexusGenFieldTypeNames {
  LoginResponse: { // field return type name
    accessToken: 'String'
    refreshToken: 'String'
  }
  Mutation: { // field return type name
    deleteArtist: 'artist'
    deleteChannel: 'channel'
    deleteRelease: 'release'
    deleteReview: 'review'
    deleteUser: 'user'
    deletemessage: 'message'
    login: 'LoginResponse'
    postArtist: 'artist'
    postChannel: 'channel'
    postMessage: 'message'
    postRelease: 'release'
    postReview: 'review'
    register: 'user'
    updateArtist: 'artist'
    updateChannel: 'channel'
    updateRelease: 'release'
    updateReview: 'review'
  }
  Query: { // field return type name
    getAllArtists: 'artist'
    getAllChannels: 'channel'
    getAllReleases: 'release'
    getArtistById: 'artist'
    getChannelById: 'channel'
    getChatMessages: 'message'
    getReleaseById: 'release'
    getReleaseReviews: 'review'
    getReviewById: 'review'
    getReviews: 'review'
    getUser: 'user'
    getUserById: 'user'
    getUsers: 'user'
    getmessageById: 'message'
    searchArtists: 'artist'
    searchReleases: 'release'
  }
  Subscription: { // field return type name
    newMessage: 'message'
  }
  artist: { // field return type name
    born: 'String'
    genres: 'String'
    id: 'Int'
    name: 'String'
    relatedArtists: 'String'
    type: 'String'
  }
  channel: { // field return type name
    id: 'Int'
    releaseId: 'Int'
    title: 'String'
  }
  message: { // field return type name
    channelId: 'Int'
    content: 'String'
    id: 'Int'
    postDate: 'String'
    posterId: 'Int'
  }
  release: { // field return type name
    artistId: 'Int'
    cover: 'String'
    genres: 'String'
    id: 'Int'
    language: 'String'
    rating: 'Float'
    ratingCount: 'Int'
    released: 'String'
    title: 'String'
    tracks: 'String'
    type: 'String'
  }
  review: { // field return type name
    description: 'String'
    id: 'Int'
    postDate: 'String'
    posterId: 'Int'
    rating: 'Int'
    releaseId: 'Int'
    title: 'String'
  }
  user: { // field return type name
    email: 'String'
    id: 'Int'
    password: 'String'
    username: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    login: { // args
      email: string; // String!
      password: string; // String!
    }
    postArtist: { // args
      born: string; // String!
      genres: Array<string | null>; // [String]!
      name: string; // String!
      relatedArtists: Array<string | null>; // [String]!
      type: string; // String!
    }
    postChannel: { // args
      releaseId: number; // Int!
      title: string; // String!
    }
    postMessage: { // args
      channelId: number; // Int!
      content: string; // String!
      posterId: number; // Int!
    }
    postRelease: { // args
      artistId: number; // Int!
      cover: string; // String!
      genres: Array<string | null>; // [String]!
      language: string; // String!
      released: string; // String!
      title: string; // String!
      tracks: Array<string | null>; // [String]!
      type: string; // String!
    }
    postReview: { // args
      description: string; // String!
      posterId: number; // Int!
      rating: number; // Int!
      releaseId: number; // Int!
      title: string; // String!
    }
    register: { // args
      email: string; // String!
      password: string; // String!
      username: string; // String!
    }
    updateArtist: { // args
      genres: Array<string | null>; // [String]!
      name: string; // String!
      relatedArtists: Array<string | null>; // [String]!
    }
    updateChannel: { // args
      open: Array<boolean | null>; // [Boolean]!
    }
    updateRelease: { // args
      cover: string; // String!
      genres: Array<string | null>; // [String]!
      id: number; // Int!
      language: string; // String!
      rating: number; // Float!
      ratingCount: number; // Int!
      released: string; // String!
      title: string; // String!
      tracks: Array<string | null>; // [String]!
      type: string; // String!
    }
    updateReview: { // args
      description: string; // String!
      rating: number; // Int!
      title: string; // String!
    }
  }
  Query: {
    getArtistById: { // args
      id: number; // Int!
    }
    getChannelById: { // args
      id: number; // Int!
    }
    getChatMessages: { // args
      id: number; // Int!
    }
    getReleaseById: { // args
      id: number; // Int!
    }
    getReleaseReviews: { // args
      id: number; // Int!
    }
    getUserById: { // args
      id: number; // Int!
    }
    getmessageById: { // args
      id: number; // Int!
    }
    searchArtists: { // args
      search: string; // String!
    }
    searchReleases: { // args
      search: string; // String!
    }
  }
  Subscription: {
    newMessage: { // args
      channelId: number; // Int!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}