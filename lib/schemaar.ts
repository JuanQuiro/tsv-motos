import { z } from 'zod'

export const FormDataSchema = z.object({
  FirstName: z.string().min(1, 'اسمك مطلوب'),
  LastName: z.string().min(1, 'مطلوب اسمك الأخير'),
  Email: z.string().min(1, 'البريد الالكتروني مطلوب').email('عنوان البريد الإلكتروني غير صالح'),
  PhoneNumber: z.string().min(1, 'رقم هاتفك مطلوب'),
  LikeTo: z.string().min(1, 'هذه الخانة مطلوبه'),
  SpecifyType: z.string().min(1, 'النوع مطلوب'),
  SpecifyRegion: z.string().min(1, 'المنطقة مطلوبة'),
  Country: z.string().min(1, 'الدولة مطلوبة'),
  District: z.string().min(1, 'المنطقة مطلوبة'),
  GovernateOrState : z.string().min(1, ' يجب ملء الحقل محافظة أو ولاية'),
  LivableArea: z.string().min(1,'هذا الحقل مطلوب ، يرجى وضع 0 كقيمة دنيا'),
  PriceRangeMax: z.string().min(1,'هذا الحقل مطلوب ، يرجى وضع 0 كقيمة دنيا'),
  BedRoomsMin: z.string().min(1,'هذا الحقل مطلوب ، يرجى وضع 0 كقيمة دنيا'),
  BathRoomsMin: z.string().min(1,'هذا الحقل مطلوب ، يرجى وضع 0 كقيمة دنيا'),
  DesiredFloor: z.string().min(1,'هذا الحقل مطلوب ، يرجى وضع 0 كقيمة دنيا'),
  NumberOfSalons: z.string().min(1,'هذا الحقل مطلوب ، يرجى وضع 0 كقيمة دنيا'),
  NumberOfLivingRooms: z.string().min(1,'هذا الحقل مطلوب ، يرجى وضع 0 كقيمة دنيا'),
  NumberOfBathrooms: z.string().min(1,'هذا الحقل مطلوب ، يرجى وضع 0 كقيمة دنيا'),
  NumberOfDiningRooms: z.string().min(1,'هذا الحقل مطلوب ، يرجى وضع 0 كقيمة دنيا'),
  MaidRoomWithBathroom: z.boolean(),
  StorageRoom: z.string().min(1,'هذا الحقل مطلوب ، يرجى وضع 0 كقيمة دنيا'),
  WaterWell:z.boolean(),
  Generator: z.boolean(),
  NumberOfParkingLots: z.string().min(1,'هذا الحقل مطلوب ، يرجى وضع 0 كقيمة دنيا'),
  OtherHomeSize: z.string().min(1,'هذا الحقل مطلوب ، يرجى وصف ما تبحث عنه باختصار'),
  CloseToWork: z.boolean(),
  CloseToSchool: z.boolean(),
  CloseToHospital: z.boolean(),
  CloseToSupermarket: z.boolean(),
  CloseToParksRecreation: z.boolean(),
  CloseToRestaurants: z.boolean(),
  CloseToHighways: z.boolean(),
  PublicTransportation: z.boolean(),
  OtherLocation: z.string().min(1,'هذا الحقل مطلوب ، يرجى وصف ما تبحث عنه باختصار'),
  NoTraffic: z.boolean(),
  VeryQuiet: z.boolean(),
  YoungerNeighbors: z.boolean(),
  OlderNeighbors: z.boolean(),
  ChildFriendly: z.boolean(),
  OtherNeighborhood: z.string().min(1,'هذا الحقل مطلوب ، يرجى وصف ما تبحث عنه باختصار'),
  CloseToHome: z.boolean(),
  GoodReputation: z.boolean(),
  SmallClassSize: z.boolean(),
  SolidCurriculum: z.boolean(),
  OtherSchools: z.string().min(1,'هذا الحقل مطلوب ، يرجى وصف ما تبحث عنه باختصار'),
  CentralAC: z.boolean(),
  WoodStove: z.boolean(),
  Fireplace: z.boolean(),
  TanklessWaterHeater: z.boolean(),
  CopperPlumbing: z.boolean(),
  SolarPower: z.boolean(),
  SecuritySystem: z.boolean(),
  HomeAutomation: z.boolean(),
  Cable: z.boolean(),
  SatelliteDish: z.boolean(),
  FiberOpticCable: z.boolean(),
  OtherHomeSystems: z.string().min(1,'هذا الحقل مطلوب ، يرجى وصف ما تبحث عنه باختصار'),
  Garage: z.boolean(),
  WalkOutBasement: z.boolean(),
  Driveway: z.boolean(),
  FencedYard: z.boolean(),
  Gardens: z.boolean(),
  Pool: z.boolean(),
  OtherHomeFeaturesExterior: z.string().min(1,'هذا الحقل مطلوب ، يرجى وصف ما تبحث عنه باختصار'),
  WoodFlooring: z.boolean(),
  MaidRoom: z.boolean(),
  LaundryRoom: z.boolean(),
  FinishedBasement: z.boolean(),
  EatInKitchen: z.boolean(),
  GameRoom: z.boolean(),
  Office: z.boolean(),
  MasterBedroom: z.boolean(),
  MasterBathroom: z.boolean(),
  WalkInCloset: z.boolean(),
  OtherHomeFeaturesInterior: z.string().min(1,'هذا الحقل مطلوب ، يرجى وصف ما تبحث عنه باختصار'),
  honeypot: z.string()
})