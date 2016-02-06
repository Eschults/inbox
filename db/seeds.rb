# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
edward = User.create(email: "edward@lewagon.com", password: "azertyuiop")
boris = User.create(email: "boris@lewagon.com", password: "azertyuiop")
seb = User.create(email: "seb@lewagon.com", password: "azertyuiop")
romain = User.create(email: "romain@lewagon.com", password: "azertyuiop")

c1 = Conversation.create(user1: edward, user2: boris)
c2 = Conversation.create(user1: edward, user2: seb)
c3 = Conversation.create(user1: edward, user2: romain)
c4 = Conversation.create(user1: boris, user2: seb)
c5 = Conversation.create(user1: boris, user2: romain)
c6 = Conversation.create(user1: seb, user2: romain)

m1 = Message.create(user: edward, conversation: c1, content: "Yo")
m2 = Message.create(user: edward, conversation: c2, content: "Hello")
m3 = Message.create(user: edward, conversation: c3, content: "What's up?")
m4 = Message.create(user: boris, conversation: c1, content: "Salut mon poulet")
m5 = Message.create(user: seb, conversation: c2, content: "Yo mec!")
m6 = Message.create(user: romain, conversation: c3, content: "Tu peux pas test")
m7 = Message.create(user: boris, conversation: c4, content: "Salut Seb")
m8 = Message.create(user: boris, conversation: c5, content: "Salut Romain")
m9 = Message.create(user: seb, conversation: c6, content: "Yo!")
m10 = Message.create(user: seb, conversation: c4, content: "Hello")
m11 = Message.create(user: romain, conversation: c5, content: "Quoi de neuf ?")
m12 = Message.create(user: romain, conversation: c6, content: "Tu fais quoi demain ?")
