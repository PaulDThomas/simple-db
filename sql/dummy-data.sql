DELETE FROM rowdata
;

INSERT INTO
  rowdata (id, simple_table_row, groupname)
VALUES
  ('2e776f11-2a91-42ab-92ad-6b7232e0d935', '{"one":"two","three":"four"}', 'G1'),
  ('fd42afd1-ec2c-4218-a58f-4be1a744e8d6', '{"one":"four","three":"five"}', 'G1'),
  ('d061e161-2f47-411f-99b5-f518e2cb8329', '{"one":"seven","three":"six"}', 'G1'),
  ('0e829755-3bf4-4b10-b160-0ba00e739368', '{"one":19,"three":9}', 'G2')
;

INSERT INTO
  rowdata (id, parent_id, simple_table_row, groupname)
VALUES
  (
    'aaad9017-e2c4-469d-90e5-7fc2721c5fe2',
    '2e776f11-2a91-42ab-92ad-6b7232e0d935',
    '{"qert":"two-c","blart":"5"}',
    'G5'
  ),
  (
    'e86ecfcb-6132-4fd7-b3f2-97a099a781a7',
    '2e776f11-2a91-42ab-92ad-6b7232e0d935',
    '{"qert":"two-d","blart":"6"}',
    'G5'
  ),
  (
    'a3435df4-900b-4f5b-9941-c0c51eaad6f3',
    '2e776f11-2a91-42ab-92ad-6b7232e0d935',
    '{"qert":"two-e","blart":"7"}',
    'G5'
  ),
  (
    'b051e6c0-5b40-4821-a4db-8b46e5b5e11b',
    'fd42afd1-ec2c-4218-a58f-4be1a744e8d6',
    '{"qert":"four","blart":"8"}',
    'G5'
  ),
  (
    '57e8446f-7ccc-405f-8d2f-9dc7359146aa',
    'd061e161-2f47-411f-99b5-f518e2cb8329',
    '{"qert":"seven","blart":"9","sqwibble":null}',
    'G5'
  ),
  (
    '261148f3-826d-49c9-82b5-4e30b0ae8f4d',
    'd061e161-2f47-411f-99b5-f518e2cb8329',
    '{"qert":"seven","blart":"10"}',
    'G5'
  ),
  (
    '7caafe7e-5e52-4170-9147-679ac40956c7',
    'd061e161-2f47-411f-99b5-f518e2cb8329',
    '{"qert":"seven","blart":"5rd"}',
    'G5'
  ),
  (
    '151c56c9-893d-43ad-a296-b1b3e9345aa7',
    '0e829755-3bf4-4b10-b160-0ba00e739368',
    '{"qert":false,"blart":true}',
    'G4'
  )
;

INSERT INTO
  rowdata (id, parent_id, simple_table_row, groupname)
VALUES
  (
    '0caed94a-ba40-433d-8995-9315fece2173',
    'aaad9017-e2c4-469d-90e5-7fc2721c5fe2',
    '{"spooge":"leaf"}',
    'G9'
  ),
  (
    '9cb272d7-1da8-4d2c-8d5e-8aaab2ce30b7',
    'e86ecfcb-6132-4fd7-b3f2-97a099a781a7',
    '{"spooge":"tree"}',
    'G9'
  ),
  (
    '4afa8104-7183-4fcc-b212-912d1c00f5f4',
    'a3435df4-900b-4f5b-9941-c0c51eaad6f3',
    '{"spooge":"branch"}',
    'G9'
  ),
  (
    '0247d5e6-dcf3-453a-bcc3-af863b2c91ad',
    'b051e6c0-5b40-4821-a4db-8b46e5b5e11b',
    '{"spooge":"flower is brutal"}',
    'G9'
  ),
  (
    '470eb33b-899a-4a21-9ed4-7b32d4bd2281',
    'b051e6c0-5b40-4821-a4db-8b46e5b5e11b',
    '{"spooge":"flower is autumn"}',
    'G9'
  ),
  (
    'd5180d85-de82-4fcd-83d3-12c28042f321',
    'b051e6c0-5b40-4821-a4db-8b46e5b5e11b',
    '{"spooge":"flower is yellow"}',
    'G9'
  ),
  (
    '3d0acdb1-fd58-4c06-b510-e3781effb86e',
    'b051e6c0-5b40-4821-a4db-8b46e5b5e11b',
    '{"spooge":"flower is pink"}',
    'G9'
  ),
  (
    'e28e8bdc-6ece-484a-a30e-9972300bccc5',
    'b051e6c0-5b40-4821-a4db-8b46e5b5e11b',
    '{"spooge":"flower is red"}',
    'G9'
  ),
  (
    'df7be93a-e4f5-42d5-83a9-a68f9b1be1ed',
    'b051e6c0-5b40-4821-a4db-8b46e5b5e11b',
    '{"spooge":"flower is blue"}',
    'G9'
  ),
  (
    'd872d3d3-cfa2-4cc7-b79e-7da57c1eccf4',
    '57e8446f-7ccc-405f-8d2f-9dc7359146aa',
    '{"spooge":"stamen"}',
    'G9'
  ),
  (
    '41aa61a7-20d3-4cc8-ab61-1ae0875f9269',
    '261148f3-826d-49c9-82b5-4e30b0ae8f4d',
    '{"spooge":"butterfly"}',
    'G9'
  ),
  (
    '77f16113-b8b1-4cca-a957-c1ad6286bdc5',
    '7caafe7e-5e52-4170-9147-679ac40956c7',
    '{"spooge":"caterpillar"}',
    'G9'
  ),
  (
    'f61aec85-8dea-43da-bacf-6c84cfaa38d2',
    '151c56c9-893d-43ad-a296-b1b3e9345aa7',
    '{"spooge":"duck"}',
    'G9'
  )
;

SELECT
  *
FROM
  rowdata
;
